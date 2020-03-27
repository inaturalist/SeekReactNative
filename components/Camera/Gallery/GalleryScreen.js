// @flow

import React, { useState, useEffect, useCallback } from "react";
import {
  Platform,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useIsFocused } from "@react-navigation/native";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import styles from "../../../styles/camera/gallery";
import GalleryHeader from "./GalleryHeader";
import GalleryContainer from "./GalleryContainer";

const GalleryScreen = () => {
  const isFocused = useIsFocused();
  const [album, setAlbum] = useState( null );
  const [photos, setPhotos] = useState( [] );
  const [error, setError] = useState( null );
  const [hasNextPage, setHasNextPage] = useState( true );
  const [lastCursor, setLastCursor] = useState( null );
  const [stillLoading, setStillLoading] = useState( false );
  const groupTypes = ( album === null ) ? "All" : "Album";

  const appendPhotos = useCallback( ( data, pageInfo ) => {
    if ( photos.length === 0 && data.length === 0 && !pageInfo.has_next_page ) {
      setError( "photos" );
    } else {
      const updatedPhotos = photos.concat( data );
      setPhotos( updatedPhotos );
      setStillLoading( false );
    }
    setHasNextPage( pageInfo.has_next_page );
    setLastCursor( pageInfo.end_cursor );
  }, [photos] );

  const fetchPhotos = useCallback( ( photoOptions ) => {
    if ( hasNextPage && !stillLoading ) {
      setStillLoading( true );

      CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
        appendPhotos( results.edges, results.page_info );
      } ).catch( ( err ) => {
        console.log( err, "error" );
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

  useEffect( () => {
    setPhotos( [] );
    setError( null );
    setHasNextPage( true );
    setLastCursor( null );
    setStillLoading( false );
  }, [album] );

  const updateAlbum = ( newAlbum: string ) => {
    setAlbum( newAlbum !== "All" ? newAlbum : null );
  };

  const setupPhotos = useCallback( () => {
    if ( photos.length === 0 ) {
      setPhotoParams();
    }
  }, [photos, setPhotoParams] );

  useEffect( () => {
    if ( isFocused ) {
      if ( Platform.OS === "android" ) {
        const requestAndroidPermissions = async () => {
          const permission = await checkCameraRollPermissions();
          if ( permission === true ) {
            setupPhotos();
          } else {
            setError( "gallery" );
          }
        };
        requestAndroidPermissions();
      } else {
        setupPhotos();
      }
    }
  }, [isFocused, setupPhotos] );

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeViewTop} />
      <StatusBar barStyle="dark-content" />
      <GalleryHeader updateAlbum={updateAlbum} />
      <GalleryContainer
        setPhotoParams={setPhotoParams}
        error={error}
        photos={photos}
      />
    </View>
  );
};

export default GalleryScreen;
