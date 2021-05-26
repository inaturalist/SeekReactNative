// @flow

import React, { useCallback, useContext, useEffect } from "react";
import { Platform, Image, TouchableOpacity } from "react-native";
import { getPredictionsForImage } from "react-native-inat-camera";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { viewStyles, imageStyles } from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import { ObservationContext } from "../../UserContext";

type Props = {
  item: Object,
  setLoading: ( ) => void
}

const GalleryImage = ( { item, setLoading }: Props ): Node => {
  const { setObservation, observation } = useContext( ObservationContext );
  const navigation = useNavigation();

  const navigateToResults = useCallback( ( uri, time, location, predictions ) => {
    const { navigate } = navigation;

    let latitude = null;
    let longitude = null;

    if ( checkForPhotoMetaData( location ) ) {
      latitude = location.latitude;
      longitude = location.longitude;
    }

    const image = {
      time,
      uri,
      predictions: [],
      errorCode: 0
    };

    if ( latitude ) {
      // $FlowFixMe
      image.latitude = latitude;
      // $FlowFixMe
      image.longitude = longitude;
    }

    if ( predictions && predictions.length > 0 ) {
      // $FlowFixMe
      image.predictions = predictions;

      setObservation( { image } );
    } else {
      setObservation( { image } );
      navigate( "OnlineServerResults", { image } );
    }
  }, [navigation, setObservation] );

  useEffect( ( ) => {
    if ( observation && observation.taxon ) {
      navigation.push( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation] );

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
    setLoading( );
    const { timestamp, location, image } = item.node;

    if ( Platform.OS === "android" ) {
      getPredictions( image.uri, timestamp, location );
    } else {
      navigateToResults( image.uri, timestamp, location );
    }
  }, [getPredictions, navigateToResults, item, setLoading] );

  const imageSource = { uri: item.node.image.uri };

  return (
    <TouchableOpacity
      accessibilityLabel={item.node.image.uri}
      accessible
      onPress={selectImage}
      style={viewStyles.button}
    >
      <Image
        source={imageSource}
        style={imageStyles.image}
      />
    </TouchableOpacity>
  );
};

export default GalleryImage;
