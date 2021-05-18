import React, { useState, useEffect, useCallback } from "react";

import { UserContext } from "./UserContext";
import { fetchAccessToken, fetchUserProfile } from "../utility/loginHelpers";
import { setupChallenges } from "../utility/challengeHelpers";

type Props = {
  children: any
}

const UserLoginProvider = ( { children }: Props ) => {
  const [login, setLogin] = useState( null );
  const [userProfile, setUserProfile] = useState( null );

  const checkINatAdminStatus = ( profile ) => {
    if ( profile.roles.includes( "admin" ) ) {
      return true;
    }
    return false;
  };

  const getLoggedIn = useCallback( async ( ) => {
    const token = await fetchAccessToken( );

    if ( !token ) {
      setupChallenges( false );
    } else {
      const profile = await fetchUserProfile( token );

      const profileObj = {
        login: profile.login,
        icon: profile.icon
      };
      setUserProfile( profileObj );
      const isAdmin = checkINatAdminStatus( profile );
      setupChallenges( isAdmin );
    }
    setLogin( token );
  }, [] );

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
