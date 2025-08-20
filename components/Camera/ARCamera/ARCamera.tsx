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
import { useNavigation, useIsFocused, useFocusEffect } from "@react-navigation/native";
import { isNumber } from "lodash";
import { useSharedValue } from "react-native-worklets-core";
import type { Prediction } from "vision-camera-plugin-inatvision";
import type { Camera, PhotoFile, TakePhotoOptions } from "react-native-vision-camera";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import CameraError from "../CameraError";
import {
  checkForSystemVersion,
  handleLog,
  showCameraSaveFailureAlert
} from "../../../utility/cameraHelpers";
import {
  checkCameraPermissions,
  checkSavePermissions
} from "../../../utility/androidHelpers.android";
import { savePostingSuccess } from "../../../utility/loginHelpers";
import { createTimestamp } from "../../../utility/dateHelpers";
import ARCameraOverlay from "./ARCameraOverlay";
import { resetRouter } from "../../../utility/navigationHelpers";
import { fetchImageLocationOrErrorCode } from "../../../utility/resultsHelpers";
import { checkIfCameraLaunched } from "../../../utility/helpers";
import { colors } from "../../../styles/global";
import Modal from "../../UIComponents/Modals/Modal";
import WarningModal from "../../Modals/WarningModal";
import { UserContext } from "../../UserContext";
import FrameProcessorCamera, { ErrorMessage, ReasonMessage } from "./FrameProcessorCamera";
import { log } from "../../../react-native-logs.config";
import { useObservation } from "../../Providers/ObservationProvider";
import { LogLevels, logToApi } from "../../../utility/apiCalls";

const logger = log.extend( "ARCamera.js" );

interface State {
  allPredictions: Prediction[];
  error: string | null;
  errorEvent: string | null;
  taxonId: string | null;
  negativeFilter: boolean;
}

const initialState: State = {
  allPredictions: [],
  error: null,
  errorEvent: null,
  negativeFilter: false,
  taxonId: null
};

enum ACTION {
  RESET_PREDICTIONS = "RESET_PREDICTIONS",
  SET_PREDICTIONS = "SET_PREDICTIONS",
  PHOTO_TAKEN = "PHOTO_TAKEN",
  RESET_STATE = "RESET_STATE",
  FILTER_TAXON = "FILTER_TAXON",
  ERROR = "ERROR"
}

type Action = { type: ACTION.RESET_PREDICTIONS }
  | { type: ACTION.SET_PREDICTIONS; predictions: Prediction[] }
  | { type: ACTION.PHOTO_TAKEN }
  | { type: ACTION.RESET_STATE }
  | { type: ACTION.FILTER_TAXON; taxonId: string | null; negativeFilter: boolean }
  | { type: ACTION.ERROR; error: string; errorEvent: string };

interface HandledPhoto extends PhotoFile {
  predictions: Prediction[];
  uri: string;
}

const ARCamera = ( ) => {
  useEffect( () => {
    logger.debug( "Uses vision camera" );
  }, [] );

  const isFocused = useIsFocused( );
  const navigation = useNavigation( );
  const camera = useRef<Camera>( null );
  const { startObservationWithImage, setObservation } = useObservation();
  const [isActive, setIsActive] = useState( true );

  // determines whether or not to fetch untruncated coords or precise coords for posting to iNat
  const { login } = useContext( UserContext );

  const pictureTaken = useSharedValue( false );

  const [state, dispatch] = useReducer( ( state: State, action: Action ) => {
    switch ( action.type ) {
      case ACTION.RESET_PREDICTIONS:
        return { ...state, allPredictions: [] };
      case ACTION.SET_PREDICTIONS:
        return { ...state, allPredictions: action.predictions };
      case ACTION.PHOTO_TAKEN:
        pictureTaken.value = true;
        return { ...state };
      case ACTION.RESET_STATE:
        pictureTaken.value = false;
        return {
          ...state,
          error: null,
          allPredictions: []
        };
      case ACTION.FILTER_TAXON:
        pictureTaken.value = false;
        return {
          ...state,
          negativeFilter: action.negativeFilter,
          taxonId: action.taxonId,
          error: null,
          allPredictions: []
        };
      case ACTION.ERROR:
        return { ...state, error: action.error, errorEvent: action.errorEvent };
      default:
        throw new Error( );
    }
  }, initialState );

  const {
    allPredictions,
    error,
    errorEvent,
    negativeFilter,
    taxonId
  } = state;

  // As of react-native-worklets-core v1.3.3 there is a discrepancy in the way objects are returned from
  // worklets. The "object" returned is not possible to be used with ...spread syntax or Object.assign which
  // we are using in other places that reference these prediction objects here after thy are attached to a
  // taken photo.
  const sortedPredictions = allPredictions
    .map( ( p: Prediction ) => ( {
      name: p.name,
      rank_level: p.rank_level,
      combined_score: p.combined_score,
      taxon_id: p.taxon_id,
      ancestor_ids: p.ancestor_ids,
      rank: p.rank
    } ) )
    .sort( ( a, b ) => b.rank_level - a.rank_level );
  const lowestRankPrediction = sortedPredictions[sortedPredictions.length - 1];

  const [showModal, setShowModal] = useState( false );
  const cameraLoaded = useSharedValue( false );
  const speciesTimeoutSet = useSharedValue( false );

  const updateError = useCallback( ( err, errEvent?: string ) => {
    // don't update error on first camera load
    if ( err === null && error === null ) {
      return;
    }
    dispatch( { type: ACTION.ERROR, error: err, errorEvent: errEvent } );
  }, [error] );

  const navigateToResults = useCallback( async ( uri: string, predictions: Prediction[] ) => {
    const userImage = {
      time: createTimestamp( ), // add current time to AR camera photos
      uri,
      predictions
    };

    // AR camera photos don't come with a location
    // especially when user has location permissions off
    // this is also needed for ancestor screen, species nearby
    const { image, errorCode } = await fetchImageLocationOrErrorCode( userImage, login );
    const hasCoordinates = isNumber( image?.latitude ) && isNumber( image?.longitude );
    logToApi( {
      level: LogLevels.INFO,
      message: `hasCoordinates ${hasCoordinates}`,
      context: "takePhoto"
    } ).catch( ( logError ) => logger.error( "logToApi failed:", logError ) );
    const rankLevel = image?.predictions.sort( ( a, b ) => a.rank_level - b.rank_level )[0]?.rank_level || 100;
    logToApi( {
      level: LogLevels.INFO,
      message: `rankLevel ${rankLevel}`,
      context: "takePhoto rankLevel"
    } ).catch( ( logError ) => logger.error( "logToApi failed:", logError ) );
    logger.debug( "fetchImageLocationOrErrorCode resolved" );
    image.errorCode = errorCode;
    image.arCamera = true;
    startObservationWithImage( image, () => {
      navigation.navigate( "Drawer", {
        screen: "Match"
      } );
    } );
  }, [startObservationWithImage, navigation, login] );

  const handleCameraRollSaveError = useCallback( async ( uri: string, predictions: Prediction[], e ) => {
    // react-native-cameraroll does not yet have granular detail about read vs. write permissions
    // but there's a pull request for it as of March 2021

    await showCameraSaveFailureAlert( e, uri );
    navigateToResults( uri, predictions );
  }, [navigateToResults] );

  const savePhoto = useCallback( async ( photo: HandledPhoto ) => {
    // One quirk of CameraRoll is that if you want to write to an album, you
    // need readwrite permission, but since version 2.17.0 we don't want to
    // ask for that anymore, and use *add only* permission only.
    CameraRoll.save( photo.uri, { } )
      .then( ( uri: string ) => {
        logger.debug( "CameraRoll.save resolved" );
        // A placeholder uri means we don't know the real URI, probably b/c we
        // only had write permission so we were able to write the photo to the
        // camera roll but not read anything about it. Keep in mind this is just
        // a hack around a bug in CameraRoll. See our fork of @react-native-camera-roll
        const uriForResults = ( uri && !uri.match( /placeholder/ ) ) ? uri : photo.uri;
        navigateToResults( uriForResults, photo.predictions );
      } )
      .catch( ( e ) => handleCameraRollSaveError( photo.uri, photo.predictions, e ) );
  }, [handleCameraRollSaveError, navigateToResults] );

  const filterByTaxonId = useCallback( ( id: string | null, filter: boolean ) => {
    dispatch( { type: ACTION.FILTER_TAXON, taxonId: id, negativeFilter: filter } );
  }, [] );

  const handleTaxaDetected = ( event: { predictions: Prediction[] } ) => {
    const { predictions } = event;

    if ( pictureTaken.value ) {
      return;
    }
    if ( predictions && !cameraLoaded.value ) {
      cameraLoaded.value = true;
    }
    // don't bother with trying to set predictions if a species timeout is in place
    if ( speciesTimeoutSet.value ) {
      return;
    }

    // not looking at kingdom or phylum as we are currently not displaying results for those ranks
    const wantedRanks = ["species", "genus", "family", "order", "class"];
    let wantedPredictions = predictions.filter( p => wantedRanks.includes( p.rank ) );
    const unwantedTaxa = [1044608, 1044607, 973699, 152504, 1128037];
    wantedPredictions = wantedPredictions.filter( p => !unwantedTaxa.includes( p.taxon_id ) );

    dispatch( { type: ACTION.SET_PREDICTIONS, predictions: wantedPredictions } );

    // Find species prediction
    const speciesPredictions = predictions.filter( p => p.rank === "species" );
    if ( speciesPredictions.length > 0 ) {
      // this block keeps the last species seen displayed for 2.5 seconds
      speciesTimeoutSet.value = true;
      setTimeout( () => {
        speciesTimeoutSet.value = false;
      }, 2500 );
    }
  };

  const handleCameraError = ( event: ErrorMessage ) => {
    const permissions = "Camera Input Failed: This app is not authorized to use Back Camera.";
    // iOS camera permissions error is handled by handleCameraError, not permission missing
    if ( error === "device" ) {
      // do nothing if there is already a device error
      return;
    }

    if ( event.nativeEvent.error === permissions ) {
      updateError( "permissions" );
    } else {
      updateError( "camera", event.nativeEvent.error );
    }
  };

  const handleClassifierError = ( event: ErrorMessage ) => {
    if ( event.nativeEvent && event.nativeEvent.error ) {
      updateError( "classifier", event.nativeEvent.error );
    } else {
      updateError( "classifier" );
    }
  };

  const handleDeviceNotSupported = ( event: ReasonMessage ) => {
    if ( event.nativeEvent && event.nativeEvent.reason ) {
      updateError( "device", event.nativeEvent.reason );
    } else {
      updateError( "device", checkForSystemVersion( ) );
    }
  };

  const handleCaptureError = useCallback( ( event: ReasonMessage ) => {
    if ( event.nativeEvent && event.nativeEvent.reason ) {
      updateError( "take", event.nativeEvent.reason );
    } else {
      updateError( "take" );
    }
  }, [updateError] );

  const requestAndroidSavePermissions = useCallback( ( photo: HandledPhoto ) => {
    const checkPermissions = async ( ) => {
      const result = await checkSavePermissions( );
      logger.debug( `checkSavePermission resolved with: ${result}` );

      if ( result === "gallery" ) {
        savePhoto( photo );
      } else {
        savePhoto( photo );
      }
    };
    // on Android, this permission check will pop up every time; on iOS it only pops up first time a user opens camera
    checkPermissions( );
  }, [savePhoto] );

  const visionCameraTakePhoto = useCallback( async ( callback ) => {
    if ( !camera.current ) {
      return;
    }
    const takePhotoOptions: TakePhotoOptions = {
      flash: "off",
      enableShutterSound: false
    };
    // Local copy of all predictions, so we can pass them to the photo after taking it
    const predictions = [...sortedPredictions];

    camera.current.takePhoto( takePhotoOptions ).then( async ( photo ) => {
      // pauseAfterCapture: true, would pause the classifier after taking a photo in legacy camera
      // setting the camera as inactive here is the closest thing to that, although there is a small delay visible
      // TODO: if the delay is too frustrating to users we would need to patch this into react-native-vision-camera directly
      setIsActive( false );
      // Use last prediction as the prediction for the photo, in legacy camera this was given by the classifier callback
      photo.predictions = predictions;
      photo.uri = photo.path;
      // Photo:
      /*
        {
          "height": 2268,
          "isRawPhoto": false,
          "metadata": {"Orientation": 6, "{Exif}": {"ApertureValue": 1.16, "BrightnessValue": 2.15, "ColorSpace": 1, "DateTimeDigitized": "2023:02:24 16:20:13", "DateTimeOriginal": "2023:02:24 16:20:13", "ExifVersion": "0220", "ExposureBiasValue": 0, "ExposureMode": 0, "ExposureProgram": 2, "ExposureTime": 0.02, "FNumber": 1.5, "Flash": 0, "FocalLenIn35mmFilm": 26, "FocalLength": 4.3, "ISOSpeedRatings": [Array], "LensMake": null, "LensModel": null, "LensSpecification": [Array], "MeteringMode": 2, "OffsetTime": null, "OffsetTimeDigitized": null, "OffsetTimeOriginal": null, "PixelXDimension": 4032, "PixelYDimension": 2268, "SceneType": 1, "SensingMethod": 1, "ShutterSpeedValue": 5.64, "SubjectArea": [Array], "SubsecTimeDigitized": "0669", "SubsecTimeOriginal": "0669", "WhiteBalance": 0}, "{TIFF}": {"DateTime": "2023:02:24 16:20:13", "Make": "samsung", "Model": "SM-G960F", "ResolutionUnit": 2, "Software": "G960FXXUHFVG4", "XResolution": 72, "YResolution": 72}},
          "path": "/data/user/0/org.inaturalist.seek/cache/mrousavy4533849973631201605.jpg",
          "width": 4032
        }
      */
      /*
        {
          "deviceOrientation": 6,
          "height": 2268,
          "isRawPhoto": false,
          "metadata": {"Orientation": 6, "{Exif}": {"ApertureValue": 1.16, "BrightnessValue": 1.95, "ColorSpace": 1, "DateTimeDigitized": "2023:05:25 17:58:49", "DateTimeOriginal": "2023:05:25 17:58:49", "ExifVersion": "0220", "ExposureBiasValue": 0, "ExposureMode": 0, "ExposureProgram": 2, "ExposureTime": 0.02, "FNumber": 1.5, "Flash": 0, "FocalLenIn35mmFilm": 26, "FocalLength": 4.3, "ISOSpeedRatings": [Array], "LensMake": null, "LensModel": null, "LensSpecification": [Array], "MeteringMode": 2, "OffsetTime": null, "OffsetTimeDigitized": null, "OffsetTimeOriginal": null, "PixelXDimension": 4032, "PixelYDimension": 2268, "SceneType": 1, "SensingMethod": 1, "ShutterSpeedValue": 5.64, "SubjectArea": [Array], "SubsecTimeDigitized": "0257", "SubsecTimeOriginal": "0257", "WhiteBalance": 0}, "{TIFF}": {"DateTime": "2023:05:25 17:58:49", "Make": "samsung", "Model": "SM-G960F", "ResolutionUnit": 2, "Software": "G960FXXUHFVG4", "XResolution": 72, "YResolution": 72}},
          "path": "/data/user/0/org.inaturalist.seek/cache/mrousavy4494367485443724594.jpg",
          "pictureOrientation": 6,
          "predictions": [
            {"ancestor_ids": [Array], "name": "Liliopsida", "rank": 50, "combined_score": 93.01357269287109, "taxon_id": 47163},
            {"ancestor_ids": [Array], "name": "Asparagales", "rank": 40, "combined_score": 92.16688275337219, "taxon_id": 47218},
            {"ancestor_ids": [Array], "name": "Iridaceae", "rank": 30, "combined_score": 91.24458432197571, "taxon_id": 47781},
            {"ancestor_ids": [Array], "name": "Iris", "rank": 20, "combined_score": 87.44127750396729, "taxon_id": 47780}
          ],
          "uri": "/data/user/0/org.inaturalist.seek/cache/mrousavy4494367485443724594.jpg",
          "width": 4032
        }
      */

      // TODO: this callback only ever uses photo.uri and photo.predictions, so we can just pass those directly
      callback( photo );
    } )
    .catch( ( e ) => handleCaptureError( { nativeEvent: { error: e } } ) );
  }, [sortedPredictions, handleCaptureError] );

  const takePicture = useCallback( async () => {
    dispatch( { type: ACTION.PHOTO_TAKEN } );

    if ( Platform.OS === "ios" ) {
      await visionCameraTakePhoto( ( photo: HandledPhoto ) => savePhoto( photo ) );
    } else if ( Platform.OS === "android" ) {
      await visionCameraTakePhoto( ( photo: HandledPhoto ) => requestAndroidSavePermissions( photo ) );
    }
  }, [
    savePhoto,
    requestAndroidSavePermissions,
    visionCameraTakePhoto
  ] );

  const resetState = ( ) => dispatch( { type: ACTION.RESET_STATE } );

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

  const closeModal = useCallback( ( ) => setShowModal( false ), [] );

  useEffect( ( ) => {
    const checkForFirstCameraLaunch = async ( ) => {
      const isFirstLaunch = await checkIfCameraLaunched( );
      if ( isFirstLaunch ) {
        setShowModal( true );
      }
    };

    const unsubscribe = navigation.addListener( "focus", ( ) => {
      setObservation( null );
      // reset when camera loads, not when leaving page, for quicker transition
      resetState( );
      checkForFirstCameraLaunch( );
      requestAndroidPermissions( );
    } );

    return unsubscribe;
  }, [navigation, requestAndroidPermissions, setObservation] );

  useFocusEffect(
    useCallback( ( ) => {
      let active = true;

      if ( active ) {
        // reset user ability to post to iNat from Match Screen
        savePostingSuccess( false );
      }

      return ( ) => {
        active = false;
      };
    }, [] )
  );

  const navHome = ( ) => resetRouter( navigation );
  const navToSettings = ( ) => navigation.navigate( "Settings" );

  const confidenceThresholdNumber = 70;

  if ( !isFocused ) {
    // this is necessary for camera to load properly in iOS
    // if removed, it means a user will see a frozen camera preview the second
    // time they try to navigate to the camera (like, after the match screen)
    return null;
  }

  const renderCamera = () => {
    return (
      <FrameProcessorCamera
        cameraRef={camera}
        confidenceThreshold={confidenceThresholdNumber}
        onCameraError={handleCameraError}
        // onCameraPermissionMissing was an empty callback
        onClassifierError={handleClassifierError}
        onDeviceNotSupported={handleDeviceNotSupported}
        onCaptureError={handleCaptureError}
        onTaxaDetected={handleTaxaDetected}
        onLog={handleLog}
        // taxaDetectionInterval is set directly on the camera component with frameProcessorFps
        filterByTaxonId={taxonId}
        negativeFilter={negativeFilter}
        // type is replaced with logic in FrameProcessorCamera
        isActive={isActive}
      />
    );
  };

  return (
    <View style={viewStyles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<WarningModal closeModal={closeModal} />}
      />
      {error
        ? <CameraError error={error} errorEvent={errorEvent} />
        : (
          <ARCameraOverlay
            prediction={lowestRankPrediction}
            pictureTaken={pictureTaken.value}
            takePicture={takePicture}
            cameraLoaded={cameraLoaded.value}
            filterByTaxonId={filterByTaxonId}
            setIsActive={setIsActive}
          />
        )
      }
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={navHome}
        style={[viewStyles.backButton, viewStyles.shadow]}
      >
        <Image source={icons.closeWhite} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "menu.settings" )}
        accessible
        onPress={navToSettings}
        style={[viewStyles.settingsButton, viewStyles.shadow]}
      >
        <Image
          tintColor={colors.white}
          style={imageStyles.settingsIcon}
          source={icons.menuSettings}
        />
      </TouchableOpacity>
      {renderCamera( )}
    </View>
  );
};

export default ARCamera;
