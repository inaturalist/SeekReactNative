// @flow

import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import { checkIsEmailValid } from "../../../utility/loginHelpers";
import ErrorMessage from "../ErrorMessage";
import InputField from "../../UIComponents/InputField";
import GreenText from "../../UIComponents/GreenText";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import createUserAgent from "../../../utility/userAgent";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";

const ForgotPasswordScreen = (): Node => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState( "" );
  const [error, setError] = useState( false );

  const emailForgotPassword = () => {

    const params = { user: { email } };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent()
    };

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users/password`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } ).then( ( responseJson ) => {
      const { status } = responseJson;
      if ( status === 200 ) {
        navigate( "PasswordEmail" );
      }
    } ).catch( ( err ) => console.log( err, "error" ) );
  };

  const checkEmail = () => {
    if ( checkIsEmailValid( email ) ) {
      setError( false );
      emailForgotPassword();
    } else {
      setError( true );
    }
  };

  return (
    <ScrollWithHeader header="inat_login.forgot_password_header">
      <View style={styles.margin} />
      <Text allowFontScaling={false} style={[styles.header, styles.marginHorizontal]}>
        {i18n.t( "inat_login.no_worries" )}
      </Text>
      <View style={[styles.leftTextMargins, styles.marginExtraLarge]}>
        <GreenText allowFontScaling={false} smaller text="inat_login.email" />
      </View>
      <InputField
        handleTextChange={value => setEmail( value )}
        placeholder="email"
        text={email}
        type="emailAddress"
      />
      {error
        ? <ErrorMessage error="email" />
        : <View style={styles.marginLarge} />}
      <GreenButton
        handlePress={() => checkEmail()}
        login
        text="inat_login.reset"
      />
    </ScrollWithHeader>
  );
};

export default ForgotPasswordScreen;
