import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "react-native-image-picker";
import {
  TouchableOpacity,
  View,
  Image,
  Platform
} from "react-native";

import i18n from "../../../i18n";
import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { dirTaxonomy, dirModel, dirGeomodel } from "../../../utility/dirStorage";
import { UserContext } from "../../UserContext";
import { useObservation } from "../../Providers/ObservationProvider";
import { viewStyles } from "../../../styles/camera/arCameraOverlay";
import icons from "../../../assets/icons";
import { readExifFromMultiplePhotos } from "../../../utility/parseExif";
import { getUnixTime } from "date-fns";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import InatVision from "./helpers/visionPluginWrapper";
import { log } from "../../../react-native-logs.config";
import { LogLevels, logToApi } from "../../../utility/apiCalls";

const logger = log.extend( "GalleryButton.tsx" );

interface Props {
  setIsActive: ( arg0: boolean ) => void;
}

const GalleryButton = ( { setIsActive }: Props ) => {
  const { setObservation, observation } = useObservation();
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const [imageSelected, setImageSelected] = useState( false );

  const navigateToResults = ( uri, time, location, predictions: InatVision.Prediction[]
 ) => {
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
      logToApi( {
        level: LogLevels.INFO,
        message: "Online vision would have been used here, but I removed it, " +
          "if you see this message it means that some device was not able to get offline vision.",
        context: "GalleryButton",
        errorType: "0"
      } ).catch( ( logError ) => logger.error( "logToApi failed:", logError ) );
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

    const hasLocation = location?.latitude != null && location?.longitude != null;
    InatVision.getPredictionsForImage( {
      version: "2.13",
      uri: reactUri,
      modelPath: dirModel,
      taxonomyPath: dirTaxonomy,
      useGeomodel: hasLocation,
      geomodelPath: dirGeomodel,
      location: hasLocation
        ? location
        : undefined
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
    setIsActive( false );
    // According to the native code of the image picker library, it never rejects the promise,
    // just returns a response object with errorCode
    const response = await ImagePicker.launchImageLibrary( {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
      forceOldAndroidPhotoPicker: true,
      chooserTitle: i18n.t( "gallery.import_photos_from" ),
      presentationStyle: "overFullScreen"
    } );

    if ( !response || response.didCancel || !response.assets || response.errorCode ) {
      // User cancelled selection of photos - nothing to do here
      setIsActive( true );
      return;
    }

    setImageSelected( true );

    const asset = response.assets[0];
    const { timestamp, uri } = asset;
    if ( !uri ) {
      throw new Error( "No URI in pick photo response" );
    }

    const exif = await readExifFromMultiplePhotos( [uri] );
    const { latitude, longitude, observed_on_string } = exif;
    const location = { latitude, longitude };
    const unixTimestamp = getUnixTime( new Date( observed_on_string ) );
    getPredictions( uri, timestamp || unixTimestamp, location );
  };

  if ( imageSelected ) {
    return <View
      style={viewStyles.galleryButton}
    >
      <LoadingWheel color="white" />
    </View>;
  }

  return (
    <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.open_gallery" )}
        accessible
        onPress={showPhotoGallery}
        style={viewStyles.galleryButton}
      >
      <Image source={icons.gallery} />
    </TouchableOpacity>
  );
};

export default GalleryButton;
