// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import { colors } from "../../styles/global";

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
    const { email } = this.state;

    return (
      <LinearGradient
        style={styles.container}
        colors={[colors.seekGreen, colors.seekTeal]}
      >
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null} enabled>
          <Text style={[styles.headerText, styles.keyboardHeaderText]}>{i18n.t( "inat_signup.enter_email" )}</Text>
          <View style={styles.secondHeaderTextContainer}>
            <Text style={[styles.secondHeaderText, styles.keyboardSecondHeaderText]}>{i18n.t( "inat_signup.under_13" )}</Text>
          </View>
          <View style={styles.leftTextContainer}>
            <Text style={styles.leftText}>{i18n.t( "inat_signup.parent_email" )}</Text>
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
            style={[styles.greenButton, { marginTop: 10 }]}
            onPress={() => this.submit()}
          >
            <Text style={styles.buttonText}>{i18n.t( "inat_signup.send_email" )}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

export default ParentalConsentScreen;
