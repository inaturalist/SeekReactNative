import * as React from "react";
import {
  View,
  Image
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import icons from "../../assets/icons";
import i18n from "../../i18n";
import { viewStyles, imageStyles } from "../../styles/auth/error";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  error: string;
}

const ErrorMessage = ( { error }: Props ) => {
  const netInfo = useNetInfo( );
  const { isConnected } = netInfo;

  let message;
  if ( !isConnected ) {
    message = i18n.t( "login.error_internet" );
  } else if ( error === "email" ) {
    message = i18n.t( "login.error_email" );
  } else if ( error === "credentials" ) {
    message = i18n.t( "login.error_credentials" );
  } else if ( error === "username" ) {
    message = i18n.t( "login.error_username_taken" );
  } else if ( error === "no_username" ) {
    message = i18n.t( "login.error_no_username" );
  } else if ( error === "no_password" ) {
    message = i18n.t( "login.error_no_password" );
  } else if (
    error ===
    "The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client."
  ) {
    message = i18n.t( "login.error_grant_invalid" );
  } else if (
    error ===
    "Client authentication failed due to unknown client, no client authentication included, or unsupported authentication method."
  ) {
    message = i18n.t( "login.error_no_client" );
  } else {
    message = error;
  }
  return (
    <View style={[
      viewStyles.errorMargin,
      viewStyles.row,
      error === "credentials" && viewStyles.smallerMargin
    ]}
    >
      <Image source={icons.error} style={imageStyles.image} />
      <View style={viewStyles.textContainer}>
        <StyledText allowFontScaling={false} style={baseTextStyles.loginError} testID="loginError">
          {message}
        </StyledText>
      </View>
    </View>
  );
};

export default ErrorMessage;
