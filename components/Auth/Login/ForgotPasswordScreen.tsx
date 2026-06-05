import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import { baseTextStyles } from "../../../styles/textStyles";
import { createJwtToken } from "../../../utility/helpers";
import { checkIsEmailValid } from "../../../utility/loginHelpers";
import createUserAgent from "../../../utility/userAgent";
import type { RootStackScreenProps } from "../../Navigation/types";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import GreenText from "../../UIComponents/GreenText";
import InputField from "../../UIComponents/InputField";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../../UIComponents/StyledText";
import ErrorMessage from "../ErrorMessage";

const ForgotPasswordScreen = ( ) => {
  const { navigate } = useNavigation<RootStackScreenProps<"Forgot">["navigation"]>( );
  const [email, setEmail] = useState( "" );
  const [error, setError] = useState( false );
  const token = createJwtToken( );

  const emailForgotPassword = ( ) => {

    const params = { user: { email } };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent( ),
      "Authorization": token,
    };

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users/password`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers,
    } ).then( ( responseJson ) => {
      const { status } = responseJson;
      if ( status === 200 ) {
        navigate( "PasswordEmail" );
      }
    } ).catch( ( err ) => console.log( err, "error" ) );
  };

  const checkEmail = ( ) => {
    if ( checkIsEmailValid( email ) ) {
      setError( false );
      emailForgotPassword( );
    } else {
      setError( true );
    }
  };

  return (
    <ScrollWithHeader header="inat_login.forgot_password_header">
      <View style={styles.margin} />
      <StyledText allowFontScaling={false} style={[baseTextStyles.emptyState, styles.header, styles.marginHorizontal]}>
        {i18n.t( "inat_login.no_worries" )}
      </StyledText>
      <View style={[styles.leftTextMargins, styles.marginExtraLarge]}>
        <GreenText allowFontScaling={false} smaller text="inat_login.email" />
      </View>
      <InputField
        handleTextChange={value => setEmail( value )}
        placeholder={i18n.t( "inat_login.email" )}
        text={email}
        type="emailAddress"
      />
      {error
        ? <ErrorMessage error="email" />
        : <View style={styles.marginLarge} />}
      <GreenButton
        handlePress={( ) => checkEmail( )}
        login
        text="inat_login.reset"
      />
    </ScrollWithHeader>
  );
};

export default ForgotPasswordScreen;
