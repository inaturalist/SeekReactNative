// @flow

import * as React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import icons from "../../assets/icons";
import i18n from "../../i18n";
import styles from "../../styles/auth/error";
import { colors } from "../../styles/global";

type Props = {
  +error: string
}

const ErrorMessage = ( { error }: Props ): React.Node => {
  let message;
  if ( error === "email" ) {
    message = i18n.t( "login.error_email" );
  } else if ( error === "credentials" ) {
    message = i18n.t( "login.error_credentials" );
  } else if ( error === "username" ) {
    message = i18n.t( "login.error_username_taken" );
  } else if ( error === "no_username" ) {
    message = i18n.t( "login.error_no_username" );
  } else if ( error === "no_password" ) {
    message = i18n.t( "login.error_no_password" );
  } else {
    message = error;
  }
  return (
    <View style={[
      styles.errorMargin,
      styles.row,
      error === "credentials" && styles.smallerMargin
    ]}
    >
      {/* $FlowFixMe */}
      <Image source={icons.error} style={styles.image} tintColor={colors.seekiNatGreen} />
      <View style={styles.textContainer}>
        <Text allowFontScaling={false} style={styles.text} testID="loginError">{message}</Text>
      </View>
    </View>
  );
};

export default ErrorMessage;
