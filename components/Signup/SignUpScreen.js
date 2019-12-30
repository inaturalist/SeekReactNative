// @flow

import React, { Component } from "react";
import { View, ScrollView } from "react-native";

import i18n from "../../i18n";
import config from "../../config";
import styles from "../../styles/signup/signup";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import InputField from "../UIComponents/InputField";
import GreenText from "../UIComponents/GreenText";
import ErrorMessage from "./ErrorMessage";
import { checkIsUsernameValid, saveAccessToken, formatError } from "../../utility/loginHelpers";
import GreenButton from "../UIComponents/GreenButton";
import createUserAgent from "../../utility/userAgent";
import { createJwtToken } from "../../utility/helpers";

type Props = {
  +navigation: any
}

type State = {
  email: string,
  licensePhotos: boolean,
  username: string,
  password: string,
  error: ?string
}

class SignUpScreen extends Component<Props, State> {
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

  setError( error: ?string ) {
    this.setState( { error } );
  }

  retrieveOAuthToken( username: string, password: string ) {
    const params = {
      client_id: config.appId,
      client_secret: config.appSecret,
      grant_type: "password",
      username,
      password
    };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent()
    };

    const site = "https://www.inaturalist.org";

    fetch( `${site}/oauth/token`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const accessToken = responseJson.access_token;
        saveAccessToken( accessToken );
        this.resetForm();
        this.submitSuccess();
      } ).catch( () => {
        this.setError( null );
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

    const token = createJwtToken();

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
      // $FlowFixMe
      params.user.preferred_photo_license = "CC-BY-NC";
    }

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent()
    };

    if ( token ) {
      // $FlowFixMe
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

  render() {
    const { username, password, error } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader
          header={i18n.t( "login.sign_up" ).toLocaleUpperCase()}
        />
        <ScrollView>
          <View style={styles.leftTextMargins}>
            <GreenText smaller text="inat_login.username" />
          </View>
          <InputField
            handleTextChange={value => this.setState( { username: value } )}
            placeholder={i18n.t( "inat_login.username" )}
            text={username}
            type="username"
          />
          <View style={styles.leftTextMargins}>
            <GreenText smaller text="inat_login.password" />
          </View>
          <InputField
            handleTextChange={value => this.setState( { password: value } )}
            placeholder="*********"
            secureTextEntry
            text={password}
            type="password"
          />
          {error
            ? <ErrorMessage error={formatError( error )} />
            : <View style={styles.greenButtonMargin} />}
          <GreenButton
            handlePress={() => this.submit()}
            login
            text={i18n.t( "inat_signup.sign_up" )}
          />
        </ScrollView>
      </View>
    );
  }
}

export default SignUpScreen;
