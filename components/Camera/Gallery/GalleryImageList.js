// @flow

import React, { useCallback, useContext, useEffect } from "react";
import { FlatList, Platform } from "react-native";
import type { Node } from "react";
import { getPredictionsForImage } from "react-native-inat-camera";
import { useNavigation } from "@react-navigation/native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { viewStyles } from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import { ObservationContext } from "../../UserContext";
import { dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";

type Props = {
  photos: Array<Object>,
  onEndReached: Function,
  setLoading: ( ) => void
}

const GalleryImageList = ( { onEndReached, photos, setLoading }: Props ): Node => {
  const { setObservation, observation } = useContext( ObservationContext );
  const navigation = useNavigation( );

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
      // $FlowFixMe
      image.onlineVision = true;
      setObservation( { image } );
      navigate( "OnlineServerResults" );
    }
  }, [navigation, setObservation] );

  useEffect( ( ) => {
    if ( observation && observation.taxon && observation.image.onlineVision === false ) {
      console.log( "navigating from gallery image list", observation.image.onlineVision );
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

  const selectImage = useCallback( ( item ) => {
    setLoading( );
    const { timestamp, location, image } = item.node;

    if ( Platform.OS === "android" ) {
      getPredictions( image.uri, timestamp, location );
    } else {
      navigateToResults( image.uri, timestamp, location );
    }
  }, [getPredictions, navigateToResults, setLoading] );

  const renderImage = useCallback( ( { item } ) => <GalleryImage item={item} selectImage={selectImage} />, [selectImage] );

  // skips measurement of dynamic content for faster loading
  const getItemLayout = useCallback( ( data, index ) => ( {
    length: ( dimensions.width / 4 - 2 ),
    offset: ( dimensions.width / 4 - 2 ) * index,
    index
  } ), [] );

  const extractKey = useCallback( ( item, index ) => `${item}${index}`, [] );

  return (
    <FlatList
      data={photos}
      contentContainerStyle={viewStyles.grayContainer}
      getItemLayout={getItemLayout}
      initialNumToRender={4}
      keyExtractor={extractKey}
      numColumns={4}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReached}
      renderItem={renderImage}
    />
  );
};

export default GalleryImageList;
