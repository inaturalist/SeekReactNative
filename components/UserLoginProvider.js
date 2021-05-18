import React, { useState, useEffect } from "react";

import { UserContext } from "./UserContext";
import { fetchAccessToken } from "../utility/loginHelpers";
import { checkINatAdminStatus, setupChallenges } from "../utility/challengeHelpers";

type Props = {
  children: any
}

const UserLoginProvider = ( { children }: Props ) => {
  const [login, setLogin] = useState( null );

  const getLoggedIn = async ( ) => {
    const token = await fetchAccessToken( );

    if ( !token ) {
      setupChallenges( false );
    } else {
      const isAdmin = await checkINatAdminStatus( token );
      setupChallenges( isAdmin );
    }
    setLogin( token );
  };

  useEffect( ( ) => {
    getLoggedIn( );
  }, [] );

  const toggleLogin = ( ) => getLoggedIn( );

  const userContextValue = { login, toggleLogin };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserLoginProvider;
