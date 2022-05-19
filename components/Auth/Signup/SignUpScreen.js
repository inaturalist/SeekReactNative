// @flow

import React, { Component } from "react";
import { View } from "react-native";
import * as RNLocalize from "react-native-localize";
import type { Node } from "react";

import i18n from "../../../i18n";
import config from "../../../config";
import styles from "../../../styles/auth/signup";
import InputField from "../../UIComponents/InputField";
import GreenText from "../../UIComponents/GreenText";
import ErrorMessage from "../ErrorMessage";
import { saveAccessToken, formatError } from "../../../utility/loginHelpers";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import createUserAgent from "../../../utility/userAgent";
import { createJwtToken } from "../../../utility/helpers";
import { UserContext } from "../../UserContext";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";

type Props = {
  +route: any,
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
  constructor( { route }: Props ) {
    super();

    const { licensePhotos, email } = route.params;

    this.state = {
      email,
      licensePhotos,
      username: "",
      password: "",
      error: null
    };
  }

  setErrorOrMessage( error: ?string ) {
    this.setState( { error } );
  }

  retrieveOAuthToken( username: string, password: string, user: Object ) {
    const params = {
      client_id: config.appId,
      client_secret: config.appSecret,
      // grant_type: "password",
      username,
      password,
      locale: i18n.locale
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
        const errorDescription = responseJson.error_description;
        if ( errorDescription ) {
          this.setErrorOrMessage( errorDescription );
        } else if ( responseJson.error === 400 ) {
          this.setErrorOrMessage( i18n.t( "inat_login.authentication_failed" ) );
        }

        const accessToken = responseJson.access_token;
        saveAccessToken( accessToken );
        user.updateLogin( );
        this.resetForm();
        this.submitSuccess();
      } ).catch( () => {
        this.setErrorOrMessage( null );
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
  createNewiNatUser( user: Object ) {
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
        locale: i18n.locale,
        time_zone: RNLocalize.getTimeZone()
      }
    };
    if ( licensePhotos ) {
      // $FlowFixMe
      params.user.preferred_observation_license = "CC-BY-NC";
      // $FlowFixMe
      params.user.preferred_photo_license = "CC-BY-NC";
    }
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent(),
      "Authorization": token
    };
    const site = "https://www.inaturalist.org";
    fetch( `${site}/users.json`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( response => response.json() )
      .then( ( responseJson ) => {
        const { errors, id, message } = responseJson;

        if ( responseJson.status === 201 ) {
          // message for the user to check their email confirmation
          this.setErrorOrMessage( message );
        } else if ( errors?.length > 0 ) {
          this.setErrorOrMessage( errors[0] );
        } else if ( id ) {
          this.retrieveOAuthToken( username, password, user );
        }
      } ).catch( ( err ) => {
        this.setErrorOrMessage( err );
      } );
  }

  submit( user: Object ) {
    this.createNewiNatUser( user );
  }

  render(): Node {
    const { username, password, error } = this.state;

    return (
      <UserContext.Consumer>
        {user => (
          <ScrollWithHeader header="login.sign_up">
            <View style={styles.leftTextMargins}>
              <GreenText allowFontScaling={false} smaller text="inat_login.username" />
            </View>
            <InputField
              handleTextChange={value => this.setState( { username: value } )}
              placeholder={i18n.t( "inat_login.username" )}
              text={username}
              type="username"
            />
            <View style={styles.leftTextMargins}>
              <GreenText allowFontScaling={false} smaller text="inat_login.password" />
            </View>
            <InputField
              handleTextChange={value => this.setState( { password: value } )}
              placeholder="*********"
              text={password}
              type="password"
            />
            {error
              ? <ErrorMessage error={formatError( error )} />
              : <View style={styles.greenButtonMargin} />}
            <GreenButton
              handlePress={() => this.submit( user )}
              login
              text="inat_signup.sign_up"
            />
          </ScrollWithHeader>
        ) }
      </UserContext.Consumer>
    );
  }
}

export default SignUpScreen;
