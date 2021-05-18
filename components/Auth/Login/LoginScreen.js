// @flow

import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import InputField from "../../UIComponents/InputField";
import GreenText from "../../UIComponents/GreenText";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ErrorMessage from "../ErrorMessage";
import { saveAccessToken } from "../../../utility/loginHelpers";
import config from "../../../config";
import createUserAgent from "../../../utility/userAgent";
import { UserContext } from "../../UserContext";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";

const LoginScreen = ( ): Node => {
  const { navigate } = useNavigation( );
  const { updateLogin } = useContext( UserContext );
  const [username, setUsername] = useState( "" );
  const [password, setPassword] = useState( "" );
  const [error, setError] = useState( false );

  const retrieveOAuthToken = ( ) => {
    const params = {
      client_id: config.appId,
      client_secret: config.appSecret,
      grant_type: "password",
      username,
      password
    };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent( )
    };

    const site = "https://www.inaturalist.org";

    if ( !username || !password ) {
      setError( true );
    } else {
      fetch( `${site}/oauth/token`, {
        method: "POST",
        body: JSON.stringify( params ),
        headers
      } )
        .then( response => response.json( ) )
        .then( ( responseJson ) => {
          const accessToken = responseJson.access_token;
          if ( !accessToken ) {
            setError( true );
          } else {
            saveAccessToken( accessToken );
            updateLogin( accessToken );
            navigate( "LoginSuccess" );
          }
        } ).catch( ( ) => { // SyntaxError: JSON Parse error: Unrecognized token '<'
          setError( true );
        } );
    }
  };

  const navToForgotPassword = ( ) => navigate( "Forgot" );
  const updateUsername = value => {
    setUsername( value );
    if ( error ) {
      setError( false );
    }
  };
  const updatePassword = value => {
    setPassword( value );
    if ( error ) {
      setError( false );
    }
  };

  const setErrorText = ( ) => {
    let errorText = "credentials";

    if ( error && !password ) {
      errorText = "no_password";
    }

    if ( error && !username ) {
      errorText = "no_username";
    }
    return errorText;
  };

  return (
    <ScrollWithHeader header="login.log_in">
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_login.username_email" />
      </View>
      <InputField
        handleTextChange={updateUsername}
        placeholder={i18n.t( "inat_login.username_or_email" )}
        text={username}
        type="username"
      />
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_login.password" />
      </View>
      <InputField
        handleTextChange={updatePassword}
        placeholder="*********"
        text={password}
        type="password"
      />
      <TouchableOpacity
        onPress={navToForgotPassword}
        style={styles.rightTextContainer}
      >
        <Text allowFontScaling={false} style={styles.forgotPasswordText}>
          {i18n.t( "inat_login.forgot_password" )}
        </Text>
      </TouchableOpacity>
      {error ? <ErrorMessage error={setErrorText( )} /> : <View style={styles.greenButtonMargin} />}
      <GreenButton
        handlePress={retrieveOAuthToken}
        login
        text="inat_login.log_in"
      />
    </ScrollWithHeader>
  );
};

export default LoginScreen;
