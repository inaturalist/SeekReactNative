import React, { useContext, useEffect, useState } from "react";
import { getPredictionsForImage } from "vision-camera-plugin-inatvision";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "react-native-image-picker";
import {
  TouchableOpacity,
  Image,
  Platform
} from "react-native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import { UserContext } from "../../UserContext";
import { useObservation } from "../../Providers/ObservationProvider";
import { viewStyles, imageStyles } from "../../../styles/camera/arCameraOverlay";
import icons from "../../../assets/icons";

const GalleryButton = ( ) => {
  const { setObservation, observation } = useObservation();
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const [imageSelected, setImageSelected] = useState( false );

  const navigateToResults = ( uri, time, location, predictions ) => {
    const { navigate } = navigation;

    const image = {
      time,
      uri,
      predictions: [],
      errorCode: 0,
      latitude: null,
      longitude: null,
      preciseCoords: {},
      onlineVision: false
    };

    if ( checkForPhotoMetaData( location ) ) {
      const { latitude, longitude } = location;
      image.latitude = latitude || null;
      image.longitude = longitude || null;

      if ( login ) {
        image.preciseCoords = {
          latitude,
          longitude,
          accuracy: null
        };
      }
    } else if ( login ) {
      image.preciseCoords = {
        latitude: null,
        longitude: null,
        accuracy: null
      };
    }

    if ( predictions && predictions.length > 0 ) {
      image.predictions = predictions;
      setObservation( { image } );
    } else {
      image.onlineVision = true;
      setObservation( { image } );
      navigate( "Confirm" );
    }
  };

  // TODO: this is a useEffect that waits until the image is attached to the new observation
  // and then navigates to the match screen; this needs to be refactored
  useEffect( ( ) => {
    if ( observation
      && observation.taxon
      && !observation.image.onlineVision
      && imageSelected
    ) {
      // changed to navigate from push bc on Android, with RN > 0.65.x, the camera was
      // popping up over the top of the match screen
      navigation.navigate( "Match" );
    }
  }, [observation, navigation, imageSelected] );

  const getPredictions = ( uri, timestamp, location ) => {
    const path = uri.split( "file://" );
    const reactUri = Platform.OS === "android" ? path[1] : uri;

    getPredictionsForImage( {
      uri: reactUri,
      modelPath: dirModel,
      taxonomyPath: dirTaxonomy,
      version: "1.0"
    } )
      .then( ( result ) => {
        const { predictions } = result;
        navigateToResults( uri, timestamp, location, predictions );
      } )
      .catch( ( err ) => {
        console.log( "Error", err );
      } );
  };

  const showPhotoGallery = async () => {
    // iNatNext
    // if ( photoGalleryShown ) {
    //   return;
    // }

    // iNatNext
    // setPhotoGalleryShown( true );

    // iNatNext
    // if ( Platform.OS === "ios" ) {
    //   // iOS has annoying transition of the screen - that if we don't wait enough time,
    //   // the launchImageLibrary would halt and not return (and not showing any image picker)
    //   await sleep( 500 );
    // }

    // According to the native code of the image picker library, it never rejects the promise,
    // just returns a response object with errorCode
    const response = await ImagePicker.launchImageLibrary( {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
      forceOldAndroidPhotoPicker: true,
      presentationStyle: "overFullScreen"
    } );

    if ( !response || response.didCancel || !response.assets || response.errorCode ) {
      // User cancelled selection of photos - nothing to do here
      return;
    }

    // TODO: This was in this order in gallery image list on press but what does it do?
    setImageSelected( true );

    // Using CameraRoll the location was provided in the response, but with ImagePicker it is not
    // TODO: parse EXIF like iNatNext does
    // const { timestamp, location, uri } = response.assets[0];
    // getPredictions( uri, timestamp, location );
    const { timestamp, uri } = response.assets[0];
    getPredictions( uri, timestamp );
  };

  return (
    <TouchableOpacity
      // accessibilityLabel={i18n.t( "accessibility.open_help" )}
      // accessible
      onPress={showPhotoGallery}
      style={viewStyles.galleryButton}
    >
      {/* TODO: add the gallery icon to icons file */}
      <Image source={icons.cameraHelp} style={imageStyles.gallery} />
    </TouchableOpacity>
  );
};

export default GalleryButton;
