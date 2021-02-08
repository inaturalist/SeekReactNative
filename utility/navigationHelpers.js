// @flow
import { DeviceEventEmitter } from "react-native";
import QuickActions from "react-native-quick-actions";

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

export {
  checkForHotStarts,
  checkForColdStarts
};
