// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import { Platform, StatusBar } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import GalleryHeader from "./GalleryHeader";
import GalleryImageList from "./GalleryImageList";
import CameraError from "../CameraError";

const GalleryScreen = () => {
  const navigation = useNavigation();
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SET_ALBUM":
        return {
          album: action.album,
          photos: [],
          error: null,
          hasNextPage: true,
          lastCursor: null,
          stillLoading: false,
          errorEvent: null
        };
      case "FETCH_PHOTOS":
        return { ...state, stillLoading: true };
      case "APPEND_PHOTOS":
        return {
          ...state,
          photos: action.photos,
          stillLoading: false,
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
    error: null,
    hasNextPage: true,
    lastCursor: null,
    stillLoading: false,
    errorEvent: null
  } );

  const {
    album,
    photos,
    error,
    hasNextPage,
    lastCursor,
    stillLoading,
    errorEvent
  } = state;

  const appendPhotos = useCallback( ( data, pageInfo ) => {
    if ( photos.length === 0 && data.length === 0 && !pageInfo.has_next_page ) {
      dispatch( { type: "ERROR", error: "photos", errorEvent: null } );
    } else {
      const updatedPhotos = photos.concat( data );
      dispatch( { type: "APPEND_PHOTOS", photos: updatedPhotos, pageInfo } );
    }
  }, [photos] );

  const fetchPhotos = useCallback( ( photoOptions ) => {
    CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
      appendPhotos( results.edges, results.page_info );
    } ).catch( ( { message } ) => {
      if ( message === "Access to photo library was denied" ) {
        dispatch( { type: "ERROR", error: "gallery", errorEvent: null } );
      } else {
        dispatch( { type: "ERROR", error: "photos", errorEvent: message } );
      }
    } );
  }, [appendPhotos] );

  const setPhotoParams = useCallback( () => {
    if ( hasNextPage && !stillLoading ) {
      dispatch( { type: "FETCH_PHOTOS" } );

      const photoOptions = {
        first: 28, // only 28 at a time can display
        assetType: "Photos",
        groupTypes: ( album === null ) ? "All" : "Album",
        include: ["location"]
      };

      if ( album ) { // append for cases where album isn't null
        // $FlowFixMe
        photoOptions.groupName = album;
      }

      if ( lastCursor ) {
        // $FlowFixMe
        photoOptions.after = lastCursor;
      }

      fetchPhotos( photoOptions );
    }
  }, [album, lastCursor, fetchPhotos, hasNextPage, stillLoading ] );

  const updateAlbum = useCallback( ( newAlbum: string ) => {
    // prevent user from reloading the same album twice
    if ( album === newAlbum ) { return; }
    dispatch( { type: "SET_ALBUM", album: newAlbum } );
  }, [album] );

  useEffect( () => {
    if ( photos.length === 0 && !error ) {
      setPhotoParams();
    }
  }, [photos.length, error, setPhotoParams] );

  useEffect( () => {
    const requestAndroidPermissions = async () => {
      if ( Platform.OS === "android" ) {
        const permission = await checkCameraRollPermissions();
        if ( permission !== true ) {
          dispatch( { type: "ERROR", error: "gallery", errorEvent: null } );
        }
      }
    };

    navigation.addListener( "focus", () => { requestAndroidPermissions(); } );
  }, [navigation] );

  return (
    <SafeAreaView style={styles.background} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <GalleryHeader updateAlbum={updateAlbum} />
      {error
        ? <CameraError error={error} errorEvent={errorEvent} />
        : <GalleryImageList setPhotoParams={setPhotoParams} photos={photos} />}
    </SafeAreaView>
  );
};

export default GalleryScreen;
