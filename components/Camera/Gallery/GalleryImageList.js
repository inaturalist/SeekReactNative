// @flow

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Platform, FlatList } from "react-native";
import type { Node } from "react";
import { getPredictionsForImage } from "vision-camera-plugin-inatvision";
import { useNavigation } from "@react-navigation/native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { viewStyles } from "../../../styles/camera/gallery";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import { UserContext } from "../../UserContext";
import { dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";
import { useObservation } from "../../Providers/ObservationProvider";

type Props = {
  photos: Array<Object>,
  onEndReached: Function
}

const GalleryImageList = ( { onEndReached, photos }: Props ): Node => {
  const { setObservation, observation } = useObservation();
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const [imageSelected, setImageSelected] = useState( false );

  // TODO: this is now only ever used once, so it doesn't need to be a callback
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
      // changed to navigate from push bc on Android, with RN > 0.65.x, the camera was
      // popping up over the top of the match screen
      navigation.navigate( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation, imageSelected] );

  const getPredictions = useCallback( ( uri, timestamp, location ) => {
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
  }, [navigateToResults] );

  const selectImage = useCallback( ( item ) => {
    setImageSelected( true );
    const { timestamp, location, image } = item.node;
    getPredictions( image.uri, timestamp, location );
  }, [getPredictions] );

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
      testID="gallery-image-list"
      // estimatedItemSize={97}
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
