// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text
} from "react-native";
import { useNavigation, useNavigationState } from "react-navigation-hooks";

import styles from "../../styles/uiComponents/loginCard";
import i18n from "../../i18n";
import { fetchAccessToken, removeAccessToken } from "../../utility/loginHelpers";
import GreenButton from "./GreenButton";

const LoginCard = () => {
  const { navigate } = useNavigation();
  const { routeName } = useNavigationState();
  const [isLoggedIn, setLoggedIn] = useState( false );

  const logUserOut = async () => {
    const loggedOut = await removeAccessToken();
    if ( loggedOut === null ) {
      setLoggedIn( false );
    }
  };

  const getLoggedIn = async () => {
    const login = await fetchAccessToken();
    if ( login ) {
      setLoggedIn( true );
    }
  };

  useEffect( () => {
    getLoggedIn();
  } );

  return (
    <View style={styles.container}>
      {routeName === "Achievements" ? (
        <Text style={styles.loginText}>
          {isLoggedIn
            ? i18n.t( "inat_stats.logged_in" )
            : i18n.t( "badges.login" )}
        </Text>
      ) : (
        <Text style={styles.italicText}>
          {isLoggedIn
            ? i18n.t( "inat_stats.logged_in" )
            : i18n.t( "inat_stats.thanks" )}
        </Text>
      )}
      {routeName !== "Achievements" ? <View style={styles.margin} /> : null}
      <GreenButton
        handlePress={() => {
          if ( isLoggedIn ) {
            logUserOut();
          } else {
            navigate( "LoginOrSignup" );
          }
        }}
        text={isLoggedIn
          ? i18n.t( "inat_stats.sign_out" ).toLocaleUpperCase()
          : i18n.t( "inat_stats.join" ).toLocaleUpperCase()}
      />
    </View>
  );
};

export default LoginCard;
