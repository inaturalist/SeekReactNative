// @flow

import React from "react";
import {
  View,
  Text
} from "react-native";

import posting from "../../assets/posting";
import i18n from "../../i18n";
import styles from "../../styles/signup/error";

type Props = {
  error: string
}

const ErrorMessage = ( { error }: Props ) => {
  let message;
  if ( error === "email" ) {
    message = i18n.t( "login.error_email" );
  } else if ( error === "credentials" ) {
    message = i18n.t( "login.error_credentials" );
  } else if ( error === "username" ) {
    message = i18n.t( "login.error_username_taken" );
  }
  return (
    <View style={styles.errorMargin}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
