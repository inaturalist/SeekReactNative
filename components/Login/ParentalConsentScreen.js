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
        <Text style={styles.headerText}>{i18n.t( "inat_signup.enter_email" )}</Text>
        <View style={styles.secondHeaderTextContainer}>
          <Text style={styles.secondHeaderText}>{i18n.t( "inat_signup.under_13" )}</Text>
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
          style={[styles.greenButton, { marginTop: 40 }]}
          onPress={() => this.submit()}
        >
          <Text style={styles.buttonText}>{i18n.t( "inat_signup.send_email" )}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ParentalConsentScreen;
