// @flow

import React, { Component } from "react";
import {
  View,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/uiComponents/loginCard";
import i18n from "../../i18n";
import { fetchAccessToken, removeAccessToken } from "../../utility/loginHelpers";
import GreenButton from "./GreenButton";


type Props = {
  +navigation: any,
  +screen: ?string
}

class LoginCard extends Component<Props> {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false
    };
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setLoggedIn( isLoggedIn ) {
    this.setState( { isLoggedIn } );
  }

  async logUserOut() {
    const loggedOut = await removeAccessToken();
    if ( loggedOut === null ) {
      this.setLoggedIn( false );
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    const { navigation, screen } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getLoggedIn()}
        />
        {screen === "achievements" ? (
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
        {screen !== "achievements" ? <View style={styles.margin} /> : null}
        <GreenButton
          handlePress={() => {
            if ( isLoggedIn ) {
              this.logUserOut();
            } else {
              navigation.navigate( "LoginOrSignup" );
            }
          }}
          text={isLoggedIn
            ? i18n.t( "inat_stats.sign_out" ).toLocaleUpperCase()
            : i18n.t( "inat_stats.join" ).toLocaleUpperCase()}
        />
      </View>
    );
  }
}

export default LoginCard;
