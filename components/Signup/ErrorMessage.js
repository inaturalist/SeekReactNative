// @flow

import React from "react";
import {
  View,
  Text
} from "react-native";

import posting from "../../assets/posting";
import i18n from "../../i18n";

type Props = {
  error: string
}

const ErrorMessage = ( { error }: Props ) => {
  let message;
  if ( error === "email" ) {
    message = <Text>{i18n.t( "login.error_email" )}</Text>;
  } else if ( error === "credentials" ) {
    message = <Text>{i18n.t( "login.error_credentials" )}</Text>;
  } else if ( error === "username" ) {
    message = <Text>{i18n.t( "login.error_username_taken" )}</Text>;
  }
  return (
    <View>
      {message}
    </View>
  );
};

export default ErrorMessage;
