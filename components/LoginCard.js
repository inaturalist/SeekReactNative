// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../styles/iNatStats";
import i18n from "../i18n";
import { fetchAccessToken, removeAccessToken } from "../utility/loginHelpers";

type Props = {
  navigation: any
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
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.getLoggedIn()}
        />
        <Text style={styles.italicText}>
          {isLoggedIn
            ? i18n.t( "inat_stats.logged_in" )
            : i18n.t( "inat_stats.thanks" )
          }
        </Text>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => {
              if ( isLoggedIn ) {
                this.logUserOut();
              } else {
                navigation.navigate( "LoginOrSignup" );
              }
            }}
          >
            <Text style={styles.buttonText}>
              {isLoggedIn
                ? i18n.t( "inat_stats.sign_out" ).toLocaleUpperCase()
                : i18n.t( "inat_stats.join" ).toLocaleUpperCase()
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginCard;
