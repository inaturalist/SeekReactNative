// @flow

import React from "react";
import {
  View,
  Text
} from "react-native";
import { withNavigation } from "react-navigation";

import styles from "../../styles/uiComponents/loginCard";
import i18n from "../../i18n";
import { removeAccessToken } from "../../utility/loginHelpers";
import GreenButton from "./GreenButton";
import UserContext from "../UserContext";

type Props = {
  +navigation: any,
  +screen: string
}

const LoginCard = ( { navigation, screen }: Props ) => {
  const logUserOut = async ( user: Object ) => {
    const loggedOut = await removeAccessToken();
    if ( loggedOut === null ) {
      user.toggleLogin();
    }
  };

  return (
    <UserContext.Consumer>
      {user => (
        <View style={styles.container}>
          {screen === "achievements" ? (
            <Text style={styles.loginText}>
              {user.login
                ? i18n.t( "inat_stats.logged_in" )
                : i18n.t( "badges.login" )}
            </Text>
          ) : (
            <Text style={styles.italicText}>
              {user.login
                ? i18n.t( "inat_stats.logged_in" )
                : i18n.t( "inat_stats.thanks" )}
            </Text>
          )}
          {screen !== "achievements" ? <View style={styles.margin} /> : null}
          <GreenButton
            handlePress={() => {
              if ( user.login ) {
                logUserOut( user );
              } else {
                navigation.navigate( "LoginOrSignup" );
              }
            }}
            text={user.login
              ? "inat_stats.sign_out"
              : "inat_stats.join"}
          />
        </View>
      )}
    </UserContext.Consumer>
  );
};

export default withNavigation( LoginCard );
