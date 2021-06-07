// @flow

import React, { useState, useEffect, useCallback } from "react";
import Realm from "realm";
import type { Node } from "react";

import { UserContext } from "../UserContext";
import { fetchAccessToken, fetchUserProfile } from "../../utility/loginHelpers";
import { setupChallenges } from "../../utility/challengeHelpers";
import realmConfig from "../../models";

type Props = {
  children: any
}

const UserLoginProvider = ( { children }: Props ): Node => {
  const [login, setLogin] = useState( null );
  const [userProfile, setUserProfile] = useState( null );

  const checkINatAdminStatus = ( profile ) => {
    if ( profile.roles.includes( "admin" ) ) {
      return true;
    }
    return false;
  };

  const updateSavedLogin = useCallback( async ( profile, token ): Promise<any> => {
    try {
      const realm = await Realm.open( realmConfig );
      const savedLogin = realm.objects( "LoginRealm" );

      if ( profile === null ) {
        return savedLogin;
      }

      if ( savedLogin.length === 0 ) {
        realm.write( ( ) => {
          realm.create( "LoginRealm", {
            loginToken: token,
            username: profile.login,
            profilePhoto: profile.icon_url,
            isAdmin: checkINatAdminStatus( profile )
          } );
        } );
      } else if (
        savedLogin[0].username !== profile.login
        || savedLogin[0].profilePhoto !== profile.icon_url
        || savedLogin[0].loginToken !== token
        || savedLogin[0].isAdmin !== checkINatAdminStatus( profile )
      ) {
        realm.write( ( ) => {
          savedLogin[0].username = profile.login;
          savedLogin[0].profilePhoto = profile.icon_url;
          savedLogin[0].isAdmin = checkINatAdminStatus( profile );
          savedLogin[0].loginToken = token;
        } );
      }
      return savedLogin;
    } catch ( e ) {
      console.log( e, "can't fetch saved login" );
    }
  }, [] );

  const deleteSavedLogin = async ( ) => {
    try {
      const realm = await Realm.open( realmConfig );
      const savedLogin = realm.objects( "LoginRealm" );
      realm.write( ( ) => {
        realm.delete( savedLogin );
      } );
    } catch ( e ) {
      console.log( e, "can't delete saved login" );
    }
  };

  const getLoggedIn = useCallback( async ( ) => {
    const token = await fetchAccessToken( );

    if ( !token ) {
      setupChallenges( false );
      await deleteSavedLogin( );
      setLogin( null );
    } else {
      // profile is null when no internet
      const profile = await fetchUserProfile( token );
      const savedLogin = await updateSavedLogin( profile, token );

      const profileObj = {
        login: savedLogin[0].username,
        // icon_url is higher resolution than icon
        icon: savedLogin[0].profilePhoto
      };
      setUserProfile( profileObj );
      setupChallenges( savedLogin[0].isAdmin );
      setLogin( savedLogin[0].loginToken );
    }
  }, [updateSavedLogin] );

  useEffect( ( ) => {
    getLoggedIn( );
  }, [getLoggedIn] );

  const updateLogin = ( ) => getLoggedIn( );

  const userContextValue = {
    login,
    updateLogin,
    userProfile
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserLoginProvider;
