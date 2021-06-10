// @flow

import { AsyncStorage, Linking } from "react-native";
import { useState, useEffect } from "react";

import { DROPBOX } from "../DropboxConstants";
import config from "../../../../config";

// modified from https://github.com/blefebvre/react-native-sqlite-demo/blob/dropbox-sync/src/sync/dropbox/DropboxAuthorize.ts
const useAuthorizeDropbox = ( ): any => {
  const [isAuthorized, setIsAuthorized] = useState( false );

  const _handleOpenURL = async ( event, stateValue ) => {
    console.log( "Deep link event!", event );

    // const queryStringResult = event.url.match( /\#(.*)/ );
    // if ( queryStringResult === null || queryStringResult.length < 2 ) {
    //   return Promise.reject(
    //     "Did not receive a query string as part of this deep link!"
    //   );
    // }

  };

  useEffect( ( ) => {
    const authorize = async ( ) => {
      // Generate a random string for Dropbox's state param.
      // This helps us be sure a deep link into the app is indeed related to the request
      // we made to Dropbox.
      const stateValue = Math.random( ).toString( );

      // Open the Dropbox authorization page in the device browser
      try {
        const canOpen = await Linking.openURL( [
          DROPBOX.AUTHORIZE_URL,
          "?response_type=token",
          `&client_id=${config.OAUTH_CLIENT_ID}`,
          `&redirect_uri=${config.OAUTH_REDIRECT_URI}`,
          `&state=${stateValue}`
        ].join( "" ) );

        const handleOpenURL = async ( event ) => {
          console.log( event, "event happened" );
          const open = await _handleOpenURL( event, stateValue );
          console.log( open, "open handled" );
        };

        Linking.addEventListener( "url", handleOpenURL );
      } catch ( e ) {
        console.log( e, "error authorizing with dropbox" );
      }
    };

    authorize( );
  }, [] );

  return isAuthorized;
};

export default useAuthorizeDropbox;
