// @flow

import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useState
} from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";
import RNFS from "react-native-fs";

import i18n from "../../../i18n";
import { viewStyles } from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import {
  showCameraSaveFailureAlert
} from "../../../utility/cameraHelpers";
import { checkCameraPermissions, checkSavePermissions } from "../../../utility/androidHelpers.android";
import { createTimestamp } from "../../../utility/dateHelpers";
import { fetchImageLocationOrErrorCode } from "../../../utility/resultsHelpers";
import { ObservationContext, UserContext } from "../../UserContext";
import LoadingWheel from "../../UIComponents/LoadingWheel";

const useVisionCamera = Platform.OS === "android";

const ARCamera = ( ): Node => {
  const navigation = useNavigation( );
  const camera = useRef<any>( null );
  const { setObservation, observation } = useContext( ObservationContext );

  // determines whether or not to fetch untruncated coords or precise coords for posting to iNat
  const { login } = useContext( UserContext );

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "RESET_RANKS":
        return { ...state, ranks: {} };
      case "SET_RANKS":
        return { ...state, ranks: action.ranks };
      case "PHOTO_TAKEN":
        return { ...state, pictureTaken: true };
      case "RESET_STATE":
        return {
          ...state,
          pictureTaken: false,
          error: null,
          ranks: {}
        };
      case "FILTER_TAXON":
        return {
          ...state,
          pictureTaken: false,
          error: null,
          ranks: {}
        };
      case "ERROR":
        return { ...state, error: action.error };
      default:
        throw new Error( );
    }
  }, {
    ranks: {},
    error: null,
    pictureTaken: false
  } );

  const {
    ranks,
    error,
    pictureTaken
  } = state;

  const updateError = useCallback( ( err, errEvent?: string ) => {
    console.log( "updateError" );
    // don't update error on first camera load
    if ( err === null && error === null ) {
      return;
    }
    dispatch( { type: "ERROR", error: err, errorEvent: errEvent } );
  }, [error] );

  const navigateToResults = useCallback( async ( uri, predictions ) => {
    const userImage = {
      time: createTimestamp( ), // add current time to AR camera photos
      uri,
      predictions
    };

    // AR camera photos don't come with a location
    // especially when user has location permissions off
    // this is also needed for ancestor screen, species nearby
    const { image, errorCode } = await fetchImageLocationOrErrorCode( userImage, login );
    image.errorCode = errorCode;
    image.arCamera = true;
    setObservation( { image } );
  }, [setObservation, login] );

  useEffect( ( ) => {
    if ( observation && observation.taxon && observation.image.arCamera && pictureTaken ) {
      navigation.navigate( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation, pictureTaken] );

  const handleCameraRollSaveError = useCallback( async ( uri, predictions, e ) => {
    // react-native-cameraroll does not yet have granular detail about read vs. write permissions
    // but there's a pull request for it as of March 2021

    await showCameraSaveFailureAlert( e, uri );
    navigateToResults( uri, predictions );
  }, [navigateToResults] );

  const savePhoto = useCallback( async ( photo: { uri: string, predictions: Array<Object> } ) => {
    console.log( "savePhoto" );
    console.log( "photo.uri", photo.uri );
    CameraRoll.save( photo.uri, { type: "photo", album: "Seek" } )
      .then( uri => navigateToResults( uri, photo.predictions ) )
      .catch( e => handleCameraRollSaveError( photo.uri, photo.predictions, e ) );
  }, [handleCameraRollSaveError, navigateToResults] );

  const handleCaptureError = useCallback( ( event: { nativeEvent?: { error: string } } ) => {
    if ( event.nativeEvent && event.nativeEvent.reason ) {
      updateError( "take", event.nativeEvent.reason );
    } else {
      updateError( "take" );
    }
  }, [updateError] );

  const requestAndroidSavePermissions = useCallback( ( photo ) => {
    const checkPermissions = async ( ) => {
      const result = await checkSavePermissions( );

      if ( result === "gallery" ) {
        savePhoto( photo );
      } else {
        savePhoto( photo );
      }
    };
    // on Android, this permission check will pop up every time; on iOS it only pops up first time a user opens camera
    checkPermissions( );
  }, [savePhoto] );

  const resetState = ( ) => dispatch( { type: "RESET_STATE" } );

  const requestAndroidPermissions = useCallback( ( ) => {
    if ( Platform.OS === "android" ) {
      checkCameraPermissions( ).then( ( result ) => {
        if ( result === "permissions" ) {
          updateError( "permissions" );
        }
        updateError( null );
      } ).catch( e => console.log( e, "couldn't get camera permissions" ) );
    }
  }, [updateError] );

  useEffect( ( ) => {
    navigation.addListener( "focus", ( ) => {
      setObservation( null );
      // reset when camera loads, not when leaving page, for quicker transition
      resetState( );
      requestAndroidPermissions( );
    } );
  }, [navigation, requestAndroidPermissions, setObservation] );

  const [source, setSource] = useState( undefined );

  const takePicture = useCallback( async () => {
    dispatch( { type: "PHOTO_TAKEN" } );

    if ( Platform.OS === "ios" ) {
      CameraRoll.getPhotos( {
        first: 20,
        assetType: "Photos"
      } )
        .then( async ( r ) => {
          console.log( "r.edges", r.edges );
          const testPhoto = r.edges[r.edges.length - 1].node.image;
          console.log( "testPhoto", testPhoto );
          let oldUri = testPhoto.uri;
          if ( testPhoto.uri.includes( "ph://" ) ) {
            let id = testPhoto.uri.replace( "ph://", "" );
            id = id.substring( 0, id.indexOf( "/" ) );
            oldUri = `assets-library://asset/asset.jpg?id=${id}&ext=jpg`;
            console.log( `Converted file uri to ${oldUri}` );
          }
          const encodedUri = encodeURI( oldUri );
          const destPath = `${RNFS.TemporaryDirectoryPath}temp.jpg`;
          const newUri = await RNFS.copyAssetsFileIOS( encodedUri, destPath, 0, 0 );
          console.log( "newUri", newUri );
          const photo = { uri: newUri, predictions: [] };
          setSource( { uri: newUri } );
          if ( typeof photo !== "object" ) {
            updateError( "photoError", photo );
          } else {
            savePhoto( photo );
          }
        } )
        .catch( ( err ) => {
          updateError( "take", err );
        } );
    } else if ( Platform.OS === "android" ) {
      if ( camera.current ) {
        if ( useVisionCamera ) {
          // TODO: mock vision camera with frame processor takePhoto() method
        } else {
          // TODO: mock react-native-inat-camera takePictureAsync() method
        }
      }
    }
  }, [
    savePhoto,
    updateError
  ] );

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.take_photo" )}
        accessible
        testID="takePhotoButton"
        onPress={takePicture}
        disabled={pictureTaken}
      >
        <Image source={icons.arCameraButton} />
      </TouchableOpacity>
    </View>
  );
};

export default ARCamera;
