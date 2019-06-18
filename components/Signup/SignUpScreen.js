// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import jwt from "react-native-jwt-io";

import i18n from "../../i18n";
import config from "../../config";
import styles from "../../styles/signup/signup";
import GreenHeader from "../GreenHeader";
import ErrorMessage from "./ErrorMessage";
import { checkIsUsernameValid, saveAccessToken } from "../../utility/loginHelpers";

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
      password: "",
      error: null
    };
  }

  setError( error ) {
    this.setState( { error } );
  }

  createJwtToken() {
    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const token = jwt.encode( claims, config.jwtSecret, "HS512" );
    return token;
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

  resetForm() {
    this.setState( {
      username: "",
      password: ""
    } );
  }

  submitSuccess() {
    const { navigation } = this.props;
    navigation.navigate( "LoginSuccess" );
  }

  createNewiNatUser() {
    const {
      email,
      licensePhotos,
      username,
      password
    } = this.state;

    const token = this.createJwtToken();

    const params = {
      user: {
        login: username,
        email,
        password,
        password_confirmation: password,
        locale: i18n.currentLocale()
      }
    };

    if ( licensePhotos ) {
      params.user.preferred_photo_license = "CC-BY-NC";
    }

    const headers = {
      "Content-Type": "application/json"
    };

    if ( token ) {
      headers.Authorization = `Authorization: ${token}`;
    }

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users.json`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const { errors, id } = responseJson;
        if ( errors && errors.length > 0 ) {
          this.setError( errors[0].toString() );
        } else if ( id ) {
          this.retrieveOAuthToken( username, password );
        }
      } ).catch( ( err ) => {
        this.setError( err );
      } );
  }

  submit() {
    const { username } = this.state;
    if ( checkIsUsernameValid( username ) ) {
      this.createNewiNatUser();
    } else {
      this.setError( "username" );
    }
  }

  formatError( error ) {
    let newError;

    if ( error.includes( "\n" ) ) {
      newError = error.replace( /\n/g, " " );
    }
    return newError;
  }

  render() {
    const { navigation } = this.props;
    const { username, password, error } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader
            header={i18n.t( "login.sign_up" ).toLocaleUpperCase()}
            navigation={navigation}
          />
          <View style={[styles.innerContainer, styles.margin]}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_login.username" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { username: value } )}
              value={username}
              placeholder="username"
              textContentType="username"
              autoFocus
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
              textContentType="password"
            />
            {error ? <ErrorMessage error={this.formatError( error )} /> : null}
            <TouchableOpacity
              style={[styles.greenButton, styles.greenButtonMargin, error && { marginTop: 5 }]}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_signup.sign_up" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default SignUpScreen;
