// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import backgrounds from "../../assets/backgrounds";

type Props = {
  navigation: any
}

class iNatLoginScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "" // don't actually store in state, this is a placeholder
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
    const { username, password } = this.state;
    const { navigation } = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={backgrounds.compass}
      >
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null} enabled>
          <Text style={[styles.headerText, styles.keyboardHeaderText]}>{i18n.t( "inat_login.log_in_with_inat" )}</Text>
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>{i18n.t( "inat_login.username" )}</Text>
          </View>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { username: value } )}
            value={username}
            placeholder="username"
            textContentType="username"
            autoFocus
          />
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>{i18n.t( "inat_login.password" )}</Text>
          </View>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { password: value } )}
            value={password}
            secureTextEntry
            placeholder="*********"
            textContentType="password"
          />
          <View style={styles.rightTextContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate( "Forgot" )}
            >
              <Text style={styles.forgotPasswordText}>{i18n.t( "inat_login.forgot_password" )}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => this.submit()}
          >
            <Text style={styles.buttonText}>{i18n.t( "inat_login.log_in" )}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default iNatLoginScreen;
