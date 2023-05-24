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
  Platform,
  NativeModules
} from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useNavigation, useIsFocused, useFocusEffect } from "@react-navigation/native";
import { INatCamera as LegacyCamera } from "react-native-inat-camera";
import type { Node } from "react";

import i18n from "../../../i18n";
import { viewStyles, imageStyles } from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import CameraError from "../CameraError";
import {
  checkForSystemVersion,
  handleLog,
  showCameraSaveFailureAlert,
  checkForCameraAPIAndroid
} from "../../../utility/cameraHelpers";
import { checkCameraPermissions, checkSavePermissions } from "../../../utility/androidHelpers.android";
import { savePostingSuccess } from "../../../utility/loginHelpers";
import { dirModel, dirTaxonomy } from "../../../utility/dirStorage";
import { createTimestamp } from "../../../utility/dateHelpers";
import ARCameraOverlay from "./ARCameraOverlay";
import { resetRouter } from "../../../utility/navigationHelpers";
import { fetchImageLocationOrErrorCode } from "../../../utility/resultsHelpers";
import { checkIfCameraLaunched } from "../../../utility/helpers";
import { colors } from "../../../styles/global";
import Modal from "../../UIComponents/Modals/Modal";
import WarningModal from "../../Modals/WarningModal";
import { ObservationContext, UserContext, AppOrientationContext } from "../../UserContext";
import FrameProcessorCamera from "./FrameProcessorCamera";

const useVisionCamera = Platform.OS === "android";

const ARCamera = ( ): Node => {
  // getting width and height passes correct dimensions to camera
  // on orientation change
  const isFocused = useIsFocused( );
  const { width, height } = useContext( AppOrientationContext );
  const navigation = useNavigation( );
  const camera = useRef<any>( null );
  const { setObservation, observation } = useContext( ObservationContext );
  const [isActive, setIsActive] = useState( true );

  // determines whether or not to fetch untruncated coords or precise coords for posting to iNat
  const { login } = useContext( UserContext );

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "CAMERA_LOADED":
        return { ...state, cameraLoaded: true };
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
          negativeFilter: action.negativeFilter,
          taxonId: action.taxonId,
          pictureTaken: false,
          error: null,
          ranks: {}
        };
      case "SHOW_FRONT_CAMERA":
        return { ...state, cameraType: action.cameraType };
      case "ERROR":
        return { ...state, error: action.error, errorEvent: action.errorEvent };
      case "SHOW_MODAL":
        return { ...state, showModal: true };
      case "CLOSE_MODAL":
        return { ...state, showModal: false };
      case "SPECIES_TIMEOUT":
        return { ...state, speciesTimeoutSet: action.speciesTimeoutSet };
      default:
        throw new Error( );
    }
  }, {
    ranks: {},
    error: null,
    errorEvent: null,
    pictureTaken: false,
    cameraLoaded: false,
    negativeFilter: false,
    taxonId: null,
    cameraType: "back",
    showModal: false,
    speciesTimeoutSet: false
  } );

  const {
    ranks,
    error,
    errorEvent,
    pictureTaken,
    cameraLoaded,
    negativeFilter,
    taxonId,
    cameraType,
    showModal,
    speciesTimeoutSet
  } = state;

  const updateError = useCallback( ( err, errEvent?: string ) => {
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

  const resetPredictions = ( ) => {
    // only rerender if state has different values than before
    if ( Object.keys( ranks ).length > 0 ) {
      dispatch( { type: "RESET_RANKS" } );
    }
  };

  const handleCameraRollSaveError = useCallback( async ( uri, predictions, e ) => {
    // react-native-cameraroll does not yet have granular detail about read vs. write permissions
    // but there's a pull request for it as of March 2021

    await showCameraSaveFailureAlert( e, uri );
    navigateToResults( uri, predictions );
  }, [navigateToResults] );

  const savePhoto = useCallback( async ( photo: { uri: string, predictions: Array<Object> } ) => {
    CameraRoll.save( photo.uri, { type: "photo", album: "Seek" } )
      .then( uri => navigateToResults( uri, photo.predictions ) )
      .catch( e => handleCameraRollSaveError( photo.uri, photo.predictions, e ) );
  }, [handleCameraRollSaveError, navigateToResults] );

  const filterByTaxonId = useCallback( ( id: number, filter: ?boolean ) => {
    dispatch( { type: "FILTER_TAXON", taxonId: id, negativeFilter: filter } );
  }, [] );

  const pauseOnSpecies = ( ) => {
    // this block keeps the last species seen displayed for 2.5 seconds
    dispatch( { type: "SPECIES_TIMEOUT", speciesTimeoutSet: true } );
    setTimeout( ( ) => {
      dispatch( { type: "SPECIES_TIMEOUT", speciesTimeoutSet: false } );
    }, 2500 );
  };

  const handleTaxaDetected = ( event ) => {
    let predictions = { ...event.nativeEvent };

    /*
      Using FrameProcessorCamera results in this as predictions atm on Android
      [
        {"stateofmatter": [{"ancestor_ids": [Array], "name": xx, "rank": xx, "score": xx, "taxon_id": xx}]},
        {"order": [{"ancestor_ids": [Array], "name": xx, "rank": xx, "score": xx, "taxon_id": xx}]},
        {"species": [{"ancestor_ids": [Array], "name": xx, "rank": xx, "score": xx, "taxon_id": xx}]}
      ]

      Previously, we were using the INatCamera, which returned this:
      {
        "stateofmatter": [{"ancestor_ids": [Array], "name": xx, "rank": xx, "score": xx, "taxon_id": xx}],
        "order": [{"ancestor_ids": [Array], "name": xx, "rank": xx, "score": xx, "taxon_id": xx}],
        "species": [{"ancestor_ids": [Array], "name": xx, "rank": xx, "score": xx, "taxon_id": xx}]
      }
    */
    if ( useVisionCamera ) {
      const transformedResults = {};
      event.forEach( ( result ) => {
        const rankString = Object.keys( result )[0];
        transformedResults[rankString] = result[rankString];
      } );
      predictions = transformedResults;
    }

    if ( pictureTaken ) {
      return;
    }

    if ( predictions && !cameraLoaded ) {
      dispatch( { type: "CAMERA_LOADED" } );
    }


    // don't bother with trying to set predictions if a species timeout is in place
    if ( speciesTimeoutSet ) {
      return;
    }

    let predictionSet = false;
    // not looking at kingdom or phylum as we are currently not displaying results for those ranks
    ["species", "genus", "family", "order", "class"].forEach( ( rank: string ) => {
      // skip this block if a prediction state has already been set
      if ( predictionSet ) {
        return;
      }
      if ( predictions[rank] ) {
        if ( rank === "species" ) {
          pauseOnSpecies();
        }
        predictionSet = true;
        const prediction = predictions[rank][0];
        //$FlowFixMe
        dispatch( { type: "SET_RANKS", ranks: { [rank]: [prediction] } } );
      }
      if ( !predictionSet ) {
        resetPredictions();
      }
    } );
  };

  const handleCameraError = ( event: { nativeEvent: { error?: string } } ) => {
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

  // event.nativeEvent.error is not implemented on Android
  // it shows up via handleCameraError on iOS
  // ignoring this callback since we're checking all permissions in React Native
  const handleCameraPermissionMissing = ( ) => {};

  const handleClassifierError = ( event: { nativeEvent?: { error: string } } ) => {
    if ( event.nativeEvent && event.nativeEvent.error ) {
      updateError( "classifier", event.nativeEvent.error );
    } else {
      updateError( "classifier" );
    }
  };

  const handleDeviceNotSupported = ( event: { nativeEvent?: { reason: string } } ) => {
    if ( event.nativeEvent && event.nativeEvent.reason ) {
      updateError( "device", event.nativeEvent.reason );
    } else {
      updateError( "device", checkForSystemVersion( ) );
    }
  };

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

  const takePicture = useCallback( async ( ) => {
    dispatch( { type: "PHOTO_TAKEN" } );

    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync( );
          if ( typeof photo !== "object" ) {
            updateError( "photoError", photo );
          } else {
            savePhoto( photo );
          }
        } catch ( e ) {
          updateError( "take", e );
        }
      } else {
        updateError( "cameraManager" );
      }
    } else if ( Platform.OS === "android" ) {
      if ( camera.current ) {
        if ( useVisionCamera ) {
          camera.current
            // pauseAfterCapture: true, would pause the classifier after taking a photo in legacy camera because of perfromance issues, but probably not needed with VisionCamera
            .takePhoto()
            // TODO: inat-camera has an option for playSoundOnCapture but it is not used there, currently Android does not make capture sound
            .then( ( photo ) => {
              setIsActive( false );
              // Photo:
              // photo {"height": 2268, "isRawPhoto": false, "metadata": {"Orientation": 6, "{Exif}": {"ApertureValue": 1.16, "BrightnessValue": 2.15, "ColorSpace": 1, "DateTimeDigitized": "2023:02:24 16:20:13", "DateTimeOriginal": "2023:02:24 16:20:13", "ExifVersion": "0220", "ExposureBiasValue": 0, "ExposureMode": 0, "ExposureProgram": 2, "ExposureTime": 0.02, "FNumber": 1.5, "Flash": 0, "FocalLenIn35mmFilm": 26, "FocalLength": 4.3, "ISOSpeedRatings": [Array], "LensMake": null, "LensModel": null, "LensSpecification": [Array], "MeteringMode": 2, "OffsetTime": null, "OffsetTimeDigitized": null, "OffsetTimeOriginal": null, "PixelXDimension": 4032, "PixelYDimension": 2268, "SceneType": 1, "SensingMethod": 1, "ShutterSpeedValue": 5.64, "SubjectArea": [Array], "SubsecTimeDigitized": "0669", "SubsecTimeOriginal": "0669", "WhiteBalance": 0}, "{TIFF}": {"DateTime": "2023:02:24 16:20:13", "Make": "samsung", "Model": "SM-G960F", "ResolutionUnit": 2, "Software": "G960FXXUHFVG4", "XResolution": 72, "YResolution": 72}}, "path": "/data/user/0/org.inaturalist.seek/cache/mrousavy4533849973631201605.jpg", "width": 4032}
              // TODO: I don'tknow if these two lines are correctly used here
              photo.deviceOrientation = photo?.metadata?.Orientation || 0;
              photo.pictureOrientation = photo?.metadata?.Orientation || 0;
              // Use last prediction as the prediction for the photo, in legacy camera this was given by the classifier callback
              photo.predictions = ranks[Object.keys( ranks )[0]];
              photo.uri = photo.path;
              requestAndroidSavePermissions( photo );
            } )
            .catch( ( e ) => handleCaptureError( { nativeEvent: { error: e } } ) );
        } else {
          camera.current
            .takePictureAsync( {
              pauseAfterCapture: true
            } )
            .then( ( photo ) => {
              // Photo:
              // photo {"deviceOrientation": 0, "height": 3024, "pictureOrientation": 0, "predictions": [{"ancestor_ids": [Array], "name": "Life", "rank": 100, "score": 1.000016450881958, "taxon_id": 48460}, {"ancestor_ids": [Array], "name": "Animalia", "rank": 70, "score": 0.9703008532524109, "taxon_id": 1}, {"ancestor_ids": [Array], "name": "Chordata", "rank": 60, "score": 0.9261167049407959, "taxon_id": 2}, {"ancestor_ids": [Array], "name": "Vertebrata", "rank": 57, "score": 0.9259731769561768, "taxon_id": 355675}, {"ancestor_ids": [Array], "name": "Aves", "rank": 50, "score": 0.9105148315429688, "taxon_id": 3}, {"ancestor_ids": [Array], "name": "Cathartiformes", "rank": 40, "score": 0.653003990650177, "taxon_id": 559244}, {"ancestor_ids": [Array], "name": "Cathartidae", "rank": 30, "score": 0.653003990650177, "taxon_id": 71306}, {"ancestor_ids": [Array], "name": "Sarcoramphus", "rank": 20, "score": 0.6520140767097473, "taxon_id": 4762}, {"ancestor_ids": [Array], "name": "Sarcoramphus papa", "rank": 10, "score": 0.9407581686973572, "taxon_id": 4763}], "uri": "file:///data/user/0/org.inaturalist.seek/cache/78f4cded-214c-4e8e-8d23-5d9a3a7c55ac.jpg", "width": 4032}
              requestAndroidSavePermissions( photo );
            } )
            .catch( ( e ) => handleCaptureError( { nativeEvent: { error: e } } ) );
        }
      }
    }
  }, [savePhoto, updateError, requestAndroidSavePermissions, ranks, handleCaptureError] );

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

  const checkCameraHardware = async ( ) => {
    // the goal of this is to make Seek usable for Android devices
    // which lack a back camera, like most Chromebooks
    const cameraHardware = await checkForCameraAPIAndroid( );

    if ( cameraHardware === "front" ) {
      dispatch( { type: "SHOW_FRONT_CAMERA", cameraType: "front" } );
    }
  };

  const closeModal = useCallback( ( ) => dispatch( { type: "CLOSE_MODAL" } ), [] );

  useEffect( ( ) => {
    const checkForFirstCameraLaunch = async ( ) => {
      const isFirstLaunch = await checkIfCameraLaunched( );
      if ( isFirstLaunch ) {
        dispatch( { type: "SHOW_MODAL" } );
      }
    };

    navigation.addListener( "focus", ( ) => {
      setObservation( null );
      // reset when camera loads, not when leaving page, for quicker transition
      resetState( );
      checkForFirstCameraLaunch( );
      requestAndroidPermissions( );
      checkCameraHardware( );
    } );
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

  const confidenceThresholdNumber = 0.7;
  const confidenceThresholdString = "0.7";
  const confidenceThreshold = Platform.OS === "ios" ? confidenceThresholdNumber : confidenceThresholdString;
  const taxaDetectionInterval = Platform.OS === "ios" ? 1000 : "1000";

  const cameraStyle = {
    width,
    height
  };

  if ( !isFocused ) {
    // this is necessary for camera to load properly in iOS
    // if removed, it means a user will see a frozen camera preview the second
    // time they try to navigate to the camera (like, after the match screen)
    return null;
  }

  const renderCamera = () => {
    if ( useVisionCamera ) {
      return (
        <FrameProcessorCamera
          modelPath={dirModel}
          taxonomyPath={dirTaxonomy}
          cameraRef={camera}
          confidenceThreshold={confidenceThresholdString}
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
    }
    return (
      <LegacyCamera
        modelPath={dirModel}
        taxonomyPath={dirTaxonomy}
        ref={camera}
        confidenceThreshold={confidenceThreshold}
        onCameraError={handleCameraError}
        onCameraPermissionMissing={handleCameraPermissionMissing}
        onClassifierError={handleClassifierError}
        onDeviceNotSupported={handleDeviceNotSupported}
        onTaxaDetected={handleTaxaDetected}
        onLog={handleLog}
        style={[viewStyles.camera, cameraStyle]}
        taxaDetectionInterval={taxaDetectionInterval}
        filterByTaxonId={taxonId}
        negativeFilter={negativeFilter}
        type={cameraType}
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
            ranks={ranks}
            pictureTaken={pictureTaken}
            takePicture={takePicture}
            cameraLoaded={cameraLoaded}
            filterByTaxonId={filterByTaxonId}
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
        {/* $FlowFixMe */}
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
