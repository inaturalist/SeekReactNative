// @flow

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import backgrounds from "../../assets/backgrounds";

type Props = {
  navigation: any
}

class SignUpScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const { licensePhotos, email } = navigation.state.params;

    this.state = {
      email,
      licensePhotos,
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

    return (
      <ImageBackground
        style={styles.container}
        source={backgrounds.compass}
      >
        <Text style={styles.headerText}>{i18n.t( "inat_signup.sign_up_inat" )}</Text>
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
        <TouchableOpacity
          style={[styles.greenButton, { marginTop: 40 }]}
          onPress={() => this.submit()}
        >
          <Text style={styles.buttonText}>{i18n.t( "inat_signup.sign_up" )}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default SignUpScreen;
