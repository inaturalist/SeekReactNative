// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/signup/signup";
import GreenHeader from "../GreenHeader";

type Props = {
  navigation: any
}

class ParentalConsentScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      email: ""
    };
  }

  submit() {
    const { navigation } = this.props;
    navigation.navigate( "ParentCheckEmail" );
  }

  render() {
    const { navigation } = this.props;
    const { email } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader navigation={navigation} header={i18n.t( "login.sign_up" )} />
          <Text style={styles.header}>
            {i18n.t( "inat_signup.enter_email" )}
          </Text>
          <Text style={styles.text}>
            {i18n.t( "inat_signup.under_13" )}
          </Text>
          <View style={{ marginTop: 22 }} />
          <View style={styles.innerContainer}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_signup.parent_email" ).toLocaleUpperCase()}
              </Text>
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
              style={[styles.greenButton, { marginTop: 58 }]}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_signup.submit" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default ParentalConsentScreen;
