// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import { capitalizeNames } from "../../utility/helpers";

type Props = {
  navigation: any
}

class ForgotPasswordScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      email: ""
    };
  }

  submit() {
    const { navigation } = this.props;
    // try to log into iNat
    // if log in succeeds, navigate to Main
    // else, have a failure state / try again / forgot password prompt
    navigation.navigate( "Main", {
      taxaName: null,
      id: null,
      taxaType: "all",
      latitude: null,
      longitude: null
    } );
  }

  render() {
    const { email } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.text}>{capitalizeNames( i18n.t( "inat_login.forgot_password" ) )}</Text>
          <Text style={styles.text}>{i18n.t( "inat_login.no_worries" )}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { email: value } )}
            value={email}
            placeholder="email address"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TouchableOpacity
            onPress={() => this.submit()}
          >
            <Text style={styles.text}>{i18n.t( "inat_login.reset" )}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ForgotPasswordScreen;
