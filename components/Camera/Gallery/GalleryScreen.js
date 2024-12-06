// @flow

import React, { useReducer, useEffect, useCallback, useRef } from "react";
import { Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import { viewStyles } from "../../../styles/camera/gallery";
import GalleryImageList from "./GalleryImageList";
import CameraError from "../CameraError";
import { fetchGalleryPhotos, checkForUniquePhotos } from "../../../utility/cameraRollHelpers";
import { useObservation } from "../../Providers/ObservationProvider";

const GalleryScreen = (): Node => {
  const navigation = useNavigation( );
  const { setObservation } = useObservation();
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "FETCH_PHOTOS":
        return { ...state, stillFetching: true };
      case "APPEND_PHOTOS":
        return {
          ...state,
          photos: action.photos,
          stillFetching: false,
          hasNextPage: action.pageInfo.has_next_page,
          lastCursor: action.pageInfo.end_cursor
        };
      case "ERROR":
        return {
          ...state,
          error:
          action.error,
          errorEvent: action.errorEvent
        };
      default:
        throw new Error();
    }
  }, {
    album: null,
    photos: [],
    hasNextPage: true,
    lastCursor: null,
    stillFetching: false,
    error: null,
    errorEvent: null,
    seen: new Set( )
  } );

  const {
    album,
    photos,
    hasNextPage,
    lastCursor,
    stillFetching,
    error,
    errorEvent,
    seen
  } = state;

  const photoCount = useRef( photos.length );
  photoCount.current = photos.length;

  const appendPhotos = useCallback( ( data, pageInfo ) => {
    if ( data.length === 0 ) {
      // this is triggered in certain edge cases, like when iOS user has "selected albums"
      // permission but has not given Seek access to a single photo
      dispatch( { type: "ERROR", error: "photos", errorEvent: null } );
    } else {
      const { newSeen, uniqAssets } = checkForUniquePhotos( seen, data );
      const newPhotos = photos.concat( uniqAssets );
      dispatch( { type: "APPEND_PHOTOS", photos: newPhotos, seen: newSeen, pageInfo } );
    }
  }, [photos, seen] );

  const handleFetchError = useCallback( ( e ) => {
    if ( e.message === "Access to photo library was denied" ) {
      dispatch( { type: "ERROR", error: "gallery", errorEvent: null } );
    } else {
      dispatch( { type: "ERROR", error: "photos", errorEvent: e.message } );
    }
  }, [] );

  const fetchPhotos = useCallback( async ( ) => {
    dispatch( { type: "FETCH_PHOTOS" } );

    try {
      const results = await fetchGalleryPhotos( album, lastCursor );
      appendPhotos( results.edges, results.page_info );
    } catch ( e ) {
      handleFetchError( e );
    }
  }, [album, lastCursor, appendPhotos, handleFetchError] );


  const onEndReached = useCallback( ( ) => {
    if ( hasNextPage && !stillFetching ) {
      fetchPhotos( );
    }
  }, [hasNextPage, fetchPhotos, stillFetching] );

  useEffect( ( ) => {
    if ( photos.length === 0 ) {
      fetchPhotos( );
    }
  }, [photos.length, fetchPhotos] );

  useEffect( ( ) => {
    const requestAndroidPermissions = async ( ) => {
      if ( Platform.OS === "android" ) {
        const permission = await checkCameraRollPermissions( );
        if ( permission !== true ) {
          dispatch( { type: "ERROR", error: "gallery", errorEvent: null } );
        }
      }
    };

    navigation.addListener( "focus", ( ) => {
      setObservation( null );
      requestAndroidPermissions( );
    } );
  }, [navigation, setObservation] );

  const renderImageList = ( ) => {
    if ( error ) {
      return <CameraError error={error} errorEvent={errorEvent} album={album} />;
    }
    // If there are no photos, render a loading wheel
    if ( photos.length === 0 ) {
      return null;
    }
    return <GalleryImageList onEndReached={onEndReached} photos={photos} />;
  };

  return (
    <SafeAreaView style={viewStyles.background} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      {renderImageList( )}
    </SafeAreaView>
  );
};

export default GalleryScreen;
