// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import type { Node } from "react";

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

type Props = {
  +navigation: any
}

type State = {
  email: string,
  error: ?string,
  loading: boolean
}

class ParentalConsentScreen extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      email: "",
      error: null,
      loading: false
    };
  }

  setError( error: ?string ) {
    this.setState( { error } );
  }

  setLoading( loading: boolean ) {
    this.setState( { loading } );
  }

  shareEmailWithiNat() {
    const { email } = this.state;

    const handleError = ( err ) => {
      this.setError( err );
      this.setLoading( false );
    };

    this.setLoading( true );
    const token = createJwtToken();

    const params = {
      email
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": token,
      "User-Agent": createUserAgent()
    };

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users/parental_consent`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( ( responseJson ) => {
        const { status } = responseJson;
        if ( status === 204 ) {
          this.setLoading( false );
          this.submit();
        } else {
          handleError( i18n.t( "login.error_request_could_not_be_completed" ) );
        }
      } ).catch( ( err ) => {
        handleError( err );
      } );
  }

  submit() {
    const { navigation } = this.props;
    navigation.navigate( "ParentCheck" );
  }

  render(): Node {
    const { email, error, loading } = this.state;

    return (
      <ScrollWithHeader header="login.sign_up">
        <View style={styles.margin} />
        <Text allowFontScaling={false} style={styles.header}>
          {i18n.t( "inat_signup.enter_email" )}
        </Text>
        <Text allowFontScaling={false} style={[styles.text, styles.keyboardText]}>
          {i18n.t( "inat_signup.under_13" )}
        </Text>
        <View style={styles.margin} />
        <View style={styles.leftTextMargins}>
          <GreenText allowFontScaling={false} smaller text="inat_signup.parent_email" />
        </View>
        <InputField
          handleTextChange={value => this.setState( { email: value } )}
          placeholder={i18n.t( "inat_signup.email" )}
          text={email}
          type="emailAddress"
        />
        <View style={styles.center}>
          {loading ? <LoadingWheel /> : null}
          {error ? <ErrorMessage error={error} /> : <View style={styles.greenButtonMargin} />}
        </View>
        <GreenButton
          handlePress={() => {
            if ( checkIsEmailValid( email ) ) {
              this.setError( null );
              this.shareEmailWithiNat();
            } else {
              this.setError( "email" );
            }
          }}
          login
          text="inat_signup.submit"
        />
      </ScrollWithHeader>
    );
  }
}

export default ParentalConsentScreen;
