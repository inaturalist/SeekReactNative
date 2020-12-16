// @flow

import React, { useCallback } from "react";
import { Platform, Image, TouchableOpacity } from "react-native";
import { getPredictionsForImage } from "react-native-inat-camera";
import { useNavigation } from "@react-navigation/native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import styles from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";

type Props = {
  item: Object
}

const GalleryImage = ( { item }: Props ) => {
  const { navigate } = useNavigation();

  const navigateToResults = useCallback( ( uri, time, location, predictions ) => {
    let latitude = null;
    let longitude = null;

    if ( checkForPhotoMetaData( location ) ) {
      latitude = location.latitude;
      longitude = location.longitude;
    }

    const image = {
      time,
      uri,
      latitude,
      longitude
    };

    if ( predictions && predictions.length > 0 ) {
      // $FlowFixMe
      image.predictions = predictions;

      navigate( "OfflineARResults", { image } );
    } else {
      navigate( "OnlineServerResults", { image } );
    }
  }, [navigate] );

  const getPredictions = useCallback( ( uri, timestamp, location ) => {
    const path = uri.split( "file://" );
    const reactUri = path[1];

    getPredictionsForImage( {
      uri: reactUri,
      modelFilename: dirModel,
      taxonomyFilename: dirTaxonomy
    } ).then( ( { predictions } ) => {
      navigateToResults( uri, timestamp, location, predictions );
    } ).catch( ( err ) => {
      console.log( "Error", err );
    } );
  }, [navigateToResults] );

  const selectImage = useCallback( () => {
    const { timestamp, location, image } = item.node;

    if ( Platform.OS === "android" ) {
      getPredictions( image.uri, timestamp, location );
    } else {
      navigateToResults( image.uri, timestamp, location );
    }
  }, [getPredictions, navigateToResults, item] );

  return (
    <TouchableOpacity
      accessibilityLabel={item.node.image.filename}
      accessible
      onPress={selectImage}
      style={styles.button}
    >
      <Image
        source={{ uri: item.node.image.uri }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default GalleryImage;
