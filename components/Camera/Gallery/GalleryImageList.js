// @flow

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Platform, FlatList } from "react-native";
import type { Node } from "react";
import { getPredictionsForImage } from "vision-camera-plugin-inatvision";
import { useNavigation } from "@react-navigation/native";

import { checkForPhotoMetaData } from "../../../utility/photoHelpers";
import { dirTaxonomy, dirModel } from "../../../utility/dirStorage";
import { UserContext } from "../../UserContext";
import GalleryImage from "./GalleryImage";
import { useObservation } from "../../Providers/ObservationProvider";

const GalleryImageList = ( ): Node => {
  const { setObservation, observation } = useObservation();
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

  return (
    <FlatList
      data={[]}
      renderItem={renderImage}
    />
  );
};

export default GalleryImageList;
