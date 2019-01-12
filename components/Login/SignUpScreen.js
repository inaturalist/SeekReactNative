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

class SignUpScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      email: "",
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
    const { email, username, password } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.text}>{i18n.t( "inat_signup.sign_up" )}</Text>
          <Text style={styles.text}>{i18n.t( "inat_signup.email" )}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { email: value } )}
            value={email}
            placeholder="email"
            textContentType="emailAddress"
          />
          <Text style={styles.text}>{i18n.t( "inat_signup.username" )}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { username: value } )}
            value={username}
            placeholder="username"
            textContentType="username"
          />
          <Text style={styles.text}>{i18n.t( "inat_signup.password" )}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={ value => this.setState( { password: value } )}
            value={password}
            secureTextEntry
            placeholder="password"
            textContentType="password"
          />
          <Text style={styles.text}>{i18n.t( "inat_signup.release_photos" )}</Text>
          <TouchableOpacity
            onPress={() => console.log( "clicked data usage" )}
          >
            <Text style={styles.text}>{i18n.t( "inat_signup.data_usage" )}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.submit()}
          >
            <Text style={styles.text}>{i18n.t( "inat_signup.create_account" )}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
