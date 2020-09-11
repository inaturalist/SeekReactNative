// @flow

import React from "react";
import { Platform, Image, TouchableOpacity } from "react-native";
import { getPredictionsForImage } from "react-native-inat-camera";
import { useNavigation } from "@react-navigation/native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import styles from "../../../styles/camera/gallery";

// import { dirSampleModel, dirSampleTaxonomy } from "../../../utility/dirStorage";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";

type Props = {
  item: Object,
  startLoading: Function,
  loading: boolean
}

const GalleryImage = ( { item, startLoading, loading }: Props ) => {
  const { navigate } = useNavigation();

  const navigateToResults = ( uri, time, location, predictions ) => {
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
  };

  const getPredictions = ( uri, timestamp, location ) => {
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
  };

  const selectAndResizeImage = ( node: Object ) => {
    const { timestamp, location, image } = node;

    if ( Platform.OS === "android" ) {
      getPredictions( image.uri, timestamp, location );
    } else {
      navigateToResults( image.uri, timestamp, location );
    }
  };

  return (
    <TouchableOpacity
      accessibilityLabel={item.node.image.filename}
      accessible
      onPress={() => {
        startLoading();
        selectAndResizeImage( item.node );
      }}
      style={styles.button}
      disabled={loading}
    >
      <Image
        source={{ uri: item.node.image.uri }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default GalleryImage;
