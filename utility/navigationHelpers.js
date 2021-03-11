// @flow
import { Platform, DeviceEventEmitter } from "react-native";
import QuickActions from "react-native-quick-actions";
import { CommonActions } from "@react-navigation/native";

const setQuickActions = () => {
  // this creates the quick action button on Android
  if ( Platform.OS === "android" ) {
    QuickActions.setShortcutItems( [{
      type: "Seek AR Camera", // Required
      title: "Seek AR Camera", // Optional, if empty, `type` will be used instead
      subtitle: "For quick identifications",
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
    if ( title === "Seek AR Camera" ) {
      navToCamera( );
    }
  } );
};

const checkForColdStarts = async ( navToCamera: ( ) => void, resetRouter: ( string ) => void ) => {
  // this addresses cold starts (i.e. before the app launches)
  try {
    const { title } = await QuickActions.popInitialAction( );

    if ( title === "Seek AR Camera" ) {
      navToCamera( );
    } else {
      resetRouter( "Drawer" );
    }
  } catch ( e ) {
    resetRouter( "Drawer" );
  }
};

const resetRouter = ( navigation: { reset: ( ) => void } ) => navigation.dispatch(
  CommonActions.reset( {
    index: 1,
    routes: [{ name: "Drawer" }]
  } )
);

// navigation.reset( { routes: [{ name: "Drawer" }] } );

export {
  setQuickActions,
  checkForHotStarts,
  checkForColdStarts,
  resetRouter
};
