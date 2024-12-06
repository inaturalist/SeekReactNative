// @flow

import React, { useReducer, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
import { viewStyles } from "../../../styles/camera/gallery";
import GalleryImageList from "./GalleryImageList";
import CameraError from "../CameraError";
import { useObservation } from "../../Providers/ObservationProvider";

const GalleryScreen = (): Node => {
  const navigation = useNavigation( );
  const { setObservation } = useObservation();
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
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
    photos: [],
    error: null,
    errorEvent: null
  } );

  const {
    photos,
    error,
    errorEvent
  } = state;

  const photoCount = useRef( photos.length );
  photoCount.current = photos.length;

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
      return <CameraError error={error} errorEvent={errorEvent} />;
    }
    // If there are no photos, render a loading wheel
    if ( photos.length === 0 ) {
      return null;
    }
    return <GalleryImageList photos={photos} />;
  };

  return (
    <SafeAreaView style={viewStyles.background} edges={["top"]}>
      {renderImageList( )}
    </SafeAreaView>
  );
};

export default GalleryScreen;
