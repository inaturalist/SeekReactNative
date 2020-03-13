// @flow

import React from "react";
import {
  Platform,
  Image,
  TouchableHighlight
} from "react-native";
import { getPredictionsForImage } from "react-native-inat-camera";
import { useNavigation } from "react-navigation-hooks";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import styles from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";

type Props = {
  item: Object,
  toggleLoading: Function
}

const GalleryImage = ( { item, toggleLoading }: Props ) => {
  const navigation = useNavigation();

  const navigateToResults = (
    uri: string,
    time: Date,
    location: Object,
    predictions: ?Array<Object>
  ) => {
    let latitude = null;
    let longitude = null;

    if ( checkForPhotoMetaData( location ) ) {
      latitude = location.latitude;
      longitude = location.longitude;
    }

    toggleLoading();

    const results = {
      time,
      uri,
      latitude,
      longitude
    };

    if ( predictions && predictions.length > 0 ) {
      // $FlowFixMe
      results.predictions = predictions;

      navigation.navigate( "OfflineARResults", results );
    } else {
      navigation.navigate( "OnlineServerResults", results );
    }
  };

  const getPredictions = ( uri: string, timestamp: Date, location: string ) => {
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
    <TouchableHighlight
      accessibilityLabel={item.node.image.filename}
      accessible
      onPress={() => {
        toggleLoading();
        selectAndResizeImage( item.node );
      }}
      style={styles.button}
      underlayColor="transparent"
    >
      <Image
        source={{ uri: item.node.image.uri }}
        style={styles.image}
      />
    </TouchableHighlight>
  );
};

export default GalleryImage;
