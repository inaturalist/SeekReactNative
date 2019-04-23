// @flow

import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../GreenHeader";

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
    navigation.navigate( "PasswordEmail" );
  }

  render() {
    const { navigation } = this.props;
    const { email } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader
            header={i18n.t( "inat_login.forgot_password" ).toLocaleUpperCase()}
            navigation={navigation}
          />
          <KeyboardAvoidingView
            contentContainerStyle={[styles.innerContainer, Platform.OS === "ios" && { marginTop: 59 }]}
            behavior="position"
            enabled
          >
            <Text style={styles.header}>
              {i18n.t( "inat_login.no_worries" )}
            </Text>
            <View style={[styles.leftTextContainer, { marginTop: 31 }]}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_login.email" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { email: value } )}
              value={email}
              placeholder="email address"
              textContentType="emailAddress"
              keyboardType={Platform.OS === "android" ? "visible-password" : "email-address"} // adding this to turn off autosuggestions on Android
              autoFocus
            />
            <TouchableOpacity
              style={[
                styles.greenButton,
                Platform.OS === "ios" && { marginTop: 92 },
                Platform.OS === "android" && { marginTop: 52 }
              ]}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_login.reset" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

export default ForgotPasswordScreen;
