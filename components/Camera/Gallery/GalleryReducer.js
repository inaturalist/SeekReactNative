// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import {
  Platform,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation } from "@react-navigation/native";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import GalleryHeader from "./GalleryHeader";
import GalleryContainer from "./GalleryContainer";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";

const GalleryScreen = () => {
  const navigation = useNavigation();
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    console.log( action.type, "dispatching" );
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
      case "LOAD_MORE_PHOTOS":
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

  const groupTypes = ( album === null ) ? "All" : "Album";

  const appendPhotos = useCallback( ( data, pageInfo ) => {
    if ( photos.length === 0 && data.length === 0 && !pageInfo.has_next_page ) {
      dispatch( { type: "ERROR", error: "photos" } );
    } else {
      const updatedPhotos = photos.concat( data );
      dispatch( { type: "LOAD_MORE_PHOTOS", photos: updatedPhotos, pageInfo } );
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
      groupTypes // this is required in RN 0.59+,
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
  }, [groupTypes, album, lastCursor, fetchPhotos] );

  const updateAlbum = useCallback( ( newAlbum: string ) => {
    dispatch( { type: "SET_ALBUM", album: newAlbum !== "All" ? newAlbum : null } );
  }, [] );

  const setupPhotos = useCallback( () => {
    if ( photos.length === 0 && loading ) {
      setPhotoParams();
    }
  }, [photos.length, loading, setPhotoParams] );

  useEffect( () => {
    if ( photos.length === 0 && loading ) {
      console.log( "setting photo params in use effect" );
      setPhotoParams();
    }
  }, [photos.length, loading, setPhotoParams] );

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
          if ( !permission ) {
            dispatch( { type: "ERROR", error: "gallery" } );
          }
        };
        requestAndroidPermissions();
      }
    } );

    navigation.addListener( "blur", () => {
      dispatch( { type: "HIDE_LOADING_WHEEL" } );
    } );
  }, [navigation, photos.length, setupPhotos] );

  // console.log( album, error, hasNextPage, lastCursor, photos.length, stillLoading, loading, "is state" );

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
