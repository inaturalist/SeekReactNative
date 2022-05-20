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
  route: any,
  navigation: any
}
const site = "https://www.inaturalist.org";

class SignUpScreen extends Component<Props> {
  constructor( { route }: Props ) {
    super( );

    const { user } = route.params;

    this.state = {
      user: { ...user },
      error: null
    };
  }

  setErrorOrMessage( error: ?string ) {
    this.setState( { error } );
  }

  resetForm( ) {
    const { user } = this.state;
    this.setState( {
      user: {
        ...user,
        login: "",
        password: "",
        password_confirmation: ""
      }
    } );
  }

  submitSuccess( ) {
    const { navigation } = this.props;
    navigation.navigate( "LoginSuccess" );
  }

  retrieveOAuthToken( newUser: Object ) {
    const { user } = this.state;
    const params = {
      client_id: config.appId,
      client_secret: config.appSecret,
      grant_type: "password",
      username: user.login,
      password: user.password,
      locale: i18n.locale
    };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent( )
    };

    fetch( `${site}/oauth/token`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( response => response.json( ) )
      .then( ( responseJson ) => {
        const errorDescription = responseJson.error_description;
        if ( errorDescription ) {
          this.setErrorOrMessage( errorDescription );
        } else if ( responseJson.error === 400 ) {
          this.setErrorOrMessage( i18n.t( "inat_login.authentication_failed" ) );
        }

        const accessToken = responseJson.access_token;
        saveAccessToken( accessToken );
        newUser.updateLogin( );
        this.resetForm( );
        this.submitSuccess( );
      } ).catch( ( e ) => {
        console.log( e, "couldn't get /oauth/token" );
        this.setErrorOrMessage( null );
      } );
  }

  createNewiNatUser( newUser: Object ) {
    const { user } = this.state;
    const token = createJwtToken( );
    const params = {
      user: {
        ...user,
        locale: i18n.locale,
        time_zone: RNLocalize.getTimeZone( )
      }
    };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent( ),
      "Authorization": token
    };

    fetch( `${site}/users.json`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( response => response.json( ) )
      .then( ( responseJson ) => {
        const { errors, id, message } = responseJson;

        if ( responseJson.status === 201 ) {
          // message for the user to check their email confirmation
          this.setErrorOrMessage( message );
        } else if ( errors?.length > 0 ) {
          this.setErrorOrMessage( errors[0] );
        } else if ( id ) {
          this.retrieveOAuthToken( newUser );
        }
      } ).catch( ( err ) => {
        this.setErrorOrMessage( err );
      } );
  }

  submit( newUser: Object ) {
    this.createNewiNatUser( newUser );
  }

  updateUsername( value ) {
    const { user } = this.state;

    this.setState( {
      user: {
        ...user,
        login: value
      }
    } );
  }

  updatePassword( value ) {
    const { user } = this.state;

    this.setState( {
      user: {
        ...user,
        password: value,
        // note: we don't have a UI for password confirmation
        password_confirmation: value
      }
    } );
  }

  render( ): Node {
    const { error, user } = this.state;

    return (
      <UserContext.Consumer>
        {userContext => (
          <ScrollWithHeader header="login.sign_up">
            <View style={styles.leftTextMargins}>
              <GreenText allowFontScaling={false} smaller text="inat_login.username" />
            </View>
            <InputField
              handleTextChange={( value ) => this.updateUsername( value )}
              placeholder={i18n.t( "inat_login.username" )}
              text={user.login}
              type="username"
            />
            <View style={styles.leftTextMargins}>
              <GreenText allowFontScaling={false} smaller text="inat_login.password" />
            </View>
            <InputField
              handleTextChange={( value ) => this.updatePassword( value )}
              placeholder="*********"
              text={user.password}
              type="password"
            />
            {error
              ? <ErrorMessage error={formatError( error )} />
              : <View style={styles.greenButtonMargin} />}
            <GreenButton
              handlePress={( ) => this.submit( userContext )}
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
