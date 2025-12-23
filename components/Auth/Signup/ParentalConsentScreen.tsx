import React, { useState } from "react";
import { View } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/signup";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ErrorMessage from "../ErrorMessage";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import GreenText from "../../UIComponents/GreenText";
import InputField from "../../UIComponents/InputField";
import { checkIsEmailValid } from "../../../utility/loginHelpers";
import { createJwtToken } from "../../../utility/helpers";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import createUserAgent from "../../../utility/userAgent";
import { colors } from "../../../styles/global";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

const ParentalConsentScreen = ( { navigation } ) => {
  const [email, setEmail] = useState( "" );
  const [error, setError] = useState<Error | string | null>( null );
  const [loading, setLoading] = useState( false );

  function shareEmailWithiNat() {
    const handleError = ( err: Error | string ) => {
      setError( err );
      setLoading( false );
    };

    setLoading( true );
    const token = createJwtToken();

    const params = {
      email,
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token,
      "User-Agent": createUserAgent(),
    };

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users/parental_consent`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers,
    } )
      .then( ( responseJson ) => {
        const { status } = responseJson;
        if ( status === 204 ) {
          setLoading( false );
          submit();
        } else {
          handleError( i18n.t( "login.error_request_could_not_be_completed" ) );
        }
      } ).catch( ( err: Error ) => {
        handleError( err );
      } );
  }

  const submit = () => {
    navigation.navigate( "ParentCheck" );
  };

  return (
    <ScrollWithHeader header="login.sign_up">
      <View style={styles.margin} />
      <StyledText allowFontScaling={false} style={[baseTextStyles.emptyState, styles.header]}>
        {i18n.t( "inat_signup.enter_email" )}
      </StyledText>
      <StyledText allowFontScaling={false} style={[baseTextStyles.body, styles.text, styles.keyboardText]}>
        {i18n.t( "inat_signup.under_13" )}
      </StyledText>
      <View style={styles.margin} />
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_signup.parent_email" />
      </View>
      <InputField
        handleTextChange={value => setEmail( value )}
        placeholder={i18n.t( "inat_signup.email" )}
        text={email}
        type="emailAddress"
      />
      <View style={styles.center}>
        {error ? <ErrorMessage error={error} /> : <View style={styles.greenButtonMargin} />}
        {loading ? <LoadingWheel color={colors.seekForestGreen} /> : null}
      </View>
      <GreenButton
        handlePress={() => {
          if ( checkIsEmailValid( email ) ) {
            setError( null );
            shareEmailWithiNat();
          } else {
            setError( "email" );
          }
        }}
        login
        text="inat_signup.submit"
      />
    </ScrollWithHeader>
  );
};

export default ParentalConsentScreen;
