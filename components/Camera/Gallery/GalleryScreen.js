// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import {
  Platform,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import GalleryHeader from "./GalleryHeader";
import GalleryContainer from "./GalleryContainer";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";

const GalleryScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
          loading: true
        };
      case "SHOW_LOADING_WHEEL":
        return { ...state, loading: true };
      case "HIDE_LOADING_WHEEL":
        return { ...state, loading: false };
      case "FETCHING_PHOTOS":
        return { ...state, stillLoading: true };
      case "APPEND_PHOTOS":
        return {
          ...state,
          photos: action.photos,
          stillLoading: false,
          hasNextPage: action.pageInfo.has_next_page,
          lastCursor: action.pageInfo.end_cursor,
          loading: false
        };
      case "ERROR":
        return { ...state, error: action.error, loading: false };
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
    loading: true
  } );

  const {
    album,
    photos,
    error,
    hasNextPage,
    lastCursor,
    stillLoading,
    loading
  } = state;

  const appendPhotos = useCallback( ( data, pageInfo ) => {
    if ( photos.length === 0 && data.length === 0 && !pageInfo.has_next_page ) {
      dispatch( { type: "ERROR", error: "photos" } );
    } else {
      const updatedPhotos = photos.concat( data );
      dispatch( { type: "APPEND_PHOTOS", photos: updatedPhotos, pageInfo } );
    }
  }, [photos] );

  const fetchPhotos = useCallback( ( photoOptions ) => {
    if ( hasNextPage && !stillLoading ) {
      dispatch( { type: "FETCHING_PHOTOS" } );

      CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
        appendPhotos( results.edges, results.page_info );
      } ).catch( ( { message } ) => {
        if ( message === "Access to photo library was denied" ) {
          dispatch( { type: "ERROR", error: "gallery" } );
        }
      } );
    }
  }, [hasNextPage, stillLoading, appendPhotos] );

  const setPhotoParams = useCallback( () => {
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
  }, [album, lastCursor, fetchPhotos] );

  const updateAlbum = useCallback( ( newAlbum: string ) => {
    if ( album === newAlbum ) { // prevent user from reloading the same album twice
      return;
    }
    dispatch( { type: "SET_ALBUM", album: newAlbum } );
  }, [album] );

  const setupPhotos = useCallback( () => {
    if ( photos.length === 0 && loading ) {
      setPhotoParams();
    }
  }, [photos.length, loading, setPhotoParams] );

  useEffect( () => {
    if ( photos.length === 0 && loading && isFocused ) {
      setPhotoParams();
    }
  }, [photos.length, loading, setPhotoParams, isFocused] );

  const renderLoadingWheel = () => (
    <View style={styles.loadingWheel}>
      <LoadingWheel color={colors.darkGray} />
    </View>
  );

  const startLoading = useCallback( () => dispatch( { type: "SHOW_LOADING_WHEEL" } ), [] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( Platform.OS === "android" ) {
        const requestAndroidPermissions = async () => {
          const permission = await checkCameraRollPermissions();
          if ( !permission && isFocused ) {
            dispatch( { type: "ERROR", error: "gallery" } );
          }
        };
        requestAndroidPermissions();
      }
    } );

    navigation.addListener( "blur", () => {
      if ( isFocused ) {
        dispatch( { type: "HIDE_LOADING_WHEEL" } );
      }
    } );
  }, [navigation, photos.length, setupPhotos, isFocused] );

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeViewTop} />
      <StatusBar barStyle="dark-content" />
      <GalleryHeader updateAlbum={updateAlbum} />
      {loading && renderLoadingWheel()}
      <GalleryContainer
        setPhotoParams={setPhotoParams}
        error={error}
        photos={photos}
        startLoading={startLoading}
        loading={loading}
      />
    </View>
  );
};

export default GalleryScreen;
