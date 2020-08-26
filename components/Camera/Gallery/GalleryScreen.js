// @flow

import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { Platform, View, StatusBar } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import GalleryHeader from "./GalleryHeader";
import GalleryImageList from "./GalleryImageList";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";
import CameraError from "../CameraError";

const GalleryScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const insets = useSafeArea();
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
          loading: true,
          errorEvent: null
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
        return {
          ...state,
          error:
          action.error,
          loading: false,
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
    loading: true,
    errorEvent: null
  } );

  const {
    album,
    photos,
    error,
    hasNextPage,
    lastCursor,
    stillLoading,
    loading,
    errorEvent
  } = state;

  const appendPhotos = useCallback( ( data, pageInfo ) => {
    if ( photos.length === 0 && data.length === 0 && !pageInfo.has_next_page ) {
      dispatch( { type: "ERROR", error: "photos", errorEvent: null } );
    } else {
      const updatedPhotos = photos.concat( data );
      if ( isFocused ) {
        dispatch( { type: "APPEND_PHOTOS", photos: updatedPhotos, pageInfo } );
      }
    }
  }, [photos, isFocused] );

  const fetchPhotos = useCallback( ( photoOptions ) => {
    if ( hasNextPage && !stillLoading ) {
      dispatch( { type: "FETCHING_PHOTOS" } );

      CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
        appendPhotos( results.edges, results.page_info );
      } ).catch( ( { message } ) => {
        if ( message === "Access to photo library was denied" ) {
          dispatch( { type: "ERROR", error: "gallery", errorEvent: null } );
        } else {
          dispatch( { type: "ERROR", error: "photos", errorEvent: message } );
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
    // prevent user from reloading the same album twice
    if ( album === newAlbum ) { return; }
    dispatch( { type: "SET_ALBUM", album: newAlbum } );
  }, [album] );

  useEffect( () => {
    if ( photos.length === 0 && loading && isFocused ) {
      setPhotoParams();
    }
  }, [photos.length, loading, setPhotoParams, isFocused] );

  const startLoading = useCallback( () => dispatch( { type: "SHOW_LOADING_WHEEL" } ), [] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( Platform.OS === "android" ) {
        const requestAndroidPermissions = async () => {
          const permission = await checkCameraRollPermissions();
          if ( !permission && isFocused ) {
            dispatch( { type: "ERROR", error: "gallery", errorEvent: null } );
          }
        };
        requestAndroidPermissions();
      }
    } );

    navigation.addListener( "blur", () => {
      if ( isFocused && loading ) {
        dispatch( { type: "HIDE_LOADING_WHEEL" } );
      }
    } );
  }, [navigation, photos.length, isFocused, loading] );

  const renderLoadingWheel = () => (
    <View style={styles.loadingWheel}>
      <LoadingWheel color={colors.darkGray} />
    </View>
  );

  const renderGalleryList = useMemo( () => (
    <GalleryImageList
      setPhotoParams={setPhotoParams}
      photos={photos}
      startLoading={startLoading}
      loading={loading}
    />
  ), [loading, photos, setPhotoParams, startLoading] );

  return (
    <View style={[styles.background, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <GalleryHeader updateAlbum={updateAlbum} />
      {loading && renderLoadingWheel()}
      {error ? <CameraError error={error} errorEvent={errorEvent} /> : renderGalleryList}
    </View>
  );
};

export default GalleryScreen;
