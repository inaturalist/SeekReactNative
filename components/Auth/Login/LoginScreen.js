// @flow

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const LoginScreen = () => {
  const { navigate } = useNavigation();
  const { toggleLogin } = useContext( UserContext );
  const [username, setUsername] = useState( null );
  const [password, setPassword] = useState( null );
  const [error, setError] = useState( false );

  const retrieveOAuthToken = () => {
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
        toggleLogin();
        navigate( "LoginSuccess" );
      } ).catch( () => { // SyntaxError: JSON Parse error: Unrecognized token '<'
        setError( true );
      } );
  };

  return (
    <ScrollWithHeader header="login.log_in">
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_login.username" />
      </View>
      <InputField
        handleTextChange={value => setUsername( value )}
        placeholder={i18n.t( "inat_login.username" )}
        text={username}
        type="username"
      />
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_login.password" />
      </View>
      <InputField
        handleTextChange={value => setPassword( value )}
        placeholder="*********"
        secureTextEntry
        text={password}
        type="password"
      />
      <TouchableOpacity
        onPress={() => navigate( "Forgot" )}
        style={styles.rightTextContainer}
      >
        <Text allowFontScaling={false} style={styles.forgotPasswordText}>
          {i18n.t( "inat_login.forgot_password" )}
        </Text>
      </TouchableOpacity>
      {error ? <ErrorMessage error="credentials" /> : <View style={styles.greenButtonMargin} />}
      <GreenButton
        handlePress={() => retrieveOAuthToken()}
        login
        text="inat_login.log_in"
      />
    </ScrollWithHeader>
  );
};

export default LoginScreen;
