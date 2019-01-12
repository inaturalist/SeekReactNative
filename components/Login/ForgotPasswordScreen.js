// @flow

import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import backgrounds from "../../assets/backgrounds";

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
      <ImageBackground
        style={styles.container}
        source={backgrounds.compass}
      >
        <Text style={styles.headerText}>{i18n.t( "inat_login.forgot_password" )}</Text>
        <View style={styles.noWorriesTextContainer}>
          <Text style={styles.noWorriesText}>{i18n.t( "inat_login.no_worries" )}</Text>
        </View>
        <View style={styles.leftTextContainer}>
          <Text style={styles.leftText}>{i18n.t( "inat_login.email" )}</Text>
        </View>
        <TextInput
          style={styles.inputField}
          onChangeText={ value => this.setState( { email: value } )}
          value={email}
          placeholder="email address"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoFocus
        />
        <TouchableOpacity
          style={[styles.greenButton, { marginTop: 40 }]}
          onPress={() => this.submit()}
        >
          <Text style={styles.buttonText}>{i18n.t( "inat_login.reset" )}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default ForgotPasswordScreen;
