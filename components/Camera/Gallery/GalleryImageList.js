// @flow

import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, Platform } from "react-native";
import type { Node } from "react";
import { getPredictionsForImage } from "react-native-inat-camera";
import { useNavigation } from "@react-navigation/native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { viewStyles } from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import { ObservationContext, UserContext } from "../../UserContext";
import { dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";

type Props = {
  photos: Array<Object>,
  onEndReached: Function,
  setLoading: ( ) => void
}

const GalleryImageList = ( { onEndReached, photos, setLoading }: Props ): Node => {
  const { setObservation, observation } = useContext( ObservationContext );
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const [imageSelected, setImageSelected] = useState( false );

  const navigateToResults = useCallback( ( uri, time, location, predictions ) => {
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
  }, [navigation, setObservation, login] );

  useEffect( ( ) => {
    if ( observation
      && observation.taxon
      && !observation.image.onlineVision
      && imageSelected
    ) {
      navigation.push( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation, imageSelected] );

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
    setImageSelected( true );
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
