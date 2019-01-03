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
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.text}>{i18n.t( "inat_login.log_in_with_inat" )}</Text>
          <Text style={styles.text}>{i18n.t( "inat_login.username" )}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { username: value } )}
            value={username}
            placeholder="username"
            textContentType="username"
          />
          <Text style={styles.text}>{i18n.t( "inat_login.password" )}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { password: value } )}
            value={password}
            secureTextEntry
            placeholder="password"
            textContentType="password"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate( "Forgot" )}
          >
            <Text style={styles.text}>{i18n.t( "inat_login.forgot_password" )}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.submit()}
          >
            <Text style={styles.text}>{i18n.t( "inat_login.log_in" )}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default iNatLoginScreen;
