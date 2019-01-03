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
        <View style={styles.column}>
          <Text style={styles.text}>{i18n.t( "inat_signup.need_permission" )}</Text>
          <Text style={styles.text}>{i18n.t( "inat_signup.email" )}</Text>
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
            <Text style={styles.text}>{i18n.t( "inat_signup.send_email" )}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ParentalConsentScreen;
