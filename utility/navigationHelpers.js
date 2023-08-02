// @flow
import { Platform, DeviceEventEmitter } from "react-native";
import QuickActions from "react-native-quick-actions";
import { CommonActions } from "@react-navigation/native";

import i18n from "../i18n";

const seekCameraTitle = Platform.OS === "android" ? i18n.t( "shortcut.seek_camera" ) : "Seek Camera";

const setQuickActions = () => {
  // this creates the quick action button on Android
  if ( Platform.OS === "android" ) {
    QuickActions.setShortcutItems( [{
      type: seekCameraTitle, // Required
      title: seekCameraTitle, // Optional, if empty, `type` will be used instead
      subtitle: i18n.t( "shortcut.subtitle" ),
      icon: "camerabutton", // Icons instructions below
      userInfo: {
        url: "app://Camera" // Provide any custom data like deep linking URL
      }
    }] );
  }
};

const checkForHotStarts = ( navToCamera: ( ) => void ) => {
  // this addresses hot starts (i.e. app is already open)
  DeviceEventEmitter.addListener( "quickActionShortcut", ( { title } ) => {
    if ( title === seekCameraTitle ) {
      navToCamera( );
    }
  } );
};

const checkForColdStarts = async ( navToCamera: ( ) => void, resetRouter: ( string ) => void ) => {
  // this addresses cold starts (i.e. before the app launches)
  try {
    // TODO: when starting the app with the Android Hermes Debugger in VS code the app always throws an exception here, check if that is something happening in production
    const { title } = await QuickActions.popInitialAction( );

    if ( title === seekCameraTitle ) {
      navToCamera( );
    } else {
      resetRouter( "Drawer" );
    }
  } catch ( e ) {
    resetRouter( "Drawer" );
  }
};

const resetRouter = ( navigation: { dispatch: Object } ): any => navigation.dispatch(
  CommonActions.reset( {
    index: 1,
    routes: [{ name: "Drawer" }]
  } )
);

export {
  setQuickActions,
  checkForHotStarts,
  checkForColdStarts,
  resetRouter
};
