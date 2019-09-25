// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../GreenHeader";
import ErrorMessage from "../Signup/ErrorMessage";
import { saveAccessToken } from "../../utility/loginHelpers";
import config from "../../config";

type Props = {
  navigation: any
}

class LoginScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      error: false
    };
  }

  setError() {
    this.setState( { error: true } );
  }

  resetForm() {
    this.setState( {
      username: "",
      password: ""
    } );
  }

  retrieveOAuthToken( username, password ) {
    const params = {
      client_id: config.appId,
      client_secret: config.appSecret,
      grant_type: "password",
      username,
      password
    };

    const site = "https://www.inaturalist.org";

    fetch( `${site}/oauth/token`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers: {
        "Content-Type": "application/json"
      }
    } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const { access_token } = responseJson;
        saveAccessToken( access_token );
        this.resetForm();
        this.submitSuccess();
      } ).catch( () => {
        this.setError();
      } );
  }

  submitSuccess() {
    const { navigation } = this.props;
    navigation.navigate( "LoginSuccess" );
  }

  render() {
    const { username, password, error } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader
            header={i18n.t( "login.log_in" ).toLocaleUpperCase()}
            navigation={navigation}
          />
          <View style={styles.innerContainer}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_login.username" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { username: value } )}
              value={username}
              placeholder={i18n.t( "inat_login.username" )}
              keyboardType={Platform.OS === "android" ? "visible-password" : "default"} // adding this to turn off autosuggestions on Android
              textContentType="username"
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
            />
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_login.password" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { password: value } )}
              value={password}
              secureTextEntry
              placeholder="*********"
              placeholderTextColor="#828282"
              textContentType="password"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.rightTextContainer}
              onPress={() => navigation.navigate( "Forgot" )}
            >
              <Text style={styles.forgotPasswordText}>
                {i18n.t( "inat_login.forgot_password" )}
              </Text>
            </TouchableOpacity>
            {error ? <ErrorMessage error="credentials" /> : null}
            <TouchableOpacity
              style={[styles.greenButton, styles.greenButtonMargin]}
              onPress={() => this.retrieveOAuthToken( username, password )}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_login.log_in" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default LoginScreen;
