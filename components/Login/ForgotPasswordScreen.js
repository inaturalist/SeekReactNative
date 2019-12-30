// @flow

import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import { checkIsEmailValid } from "../../utility/loginHelpers";
import ErrorMessage from "../Signup/ErrorMessage";
import InputField from "../UIComponents/InputField";
import GreenText from "../UIComponents/GreenText";
import GreenButton from "../UIComponents/GreenButton";
import createUserAgent from "../../utility/userAgent";
import { createJwtToken } from "../../utility/helpers";

type Props = {
  +navigation: any
}

type State = {
  email: string,
  error: boolean
}

class ForgotPasswordScreen extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      email: "",
      error: false
    };
  }

  setError( error: boolean ) {
    this.setState( { error } );
  }

  checkEmail() {
    const { email } = this.state;

    if ( checkIsEmailValid( email ) ) {
      this.setError( false );
      this.emailForgotPassword();
    } else {
      this.setError( true );
    }
  }

  emailForgotPassword() {
    const { email } = this.state;

    const token = createJwtToken();

    const params = {
      user: {
        email
      }
    };

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent()
    };

    if ( token ) {
      // $FlowFixMe
      headers.Authorization = `Authorization: ${token}`;
    }

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users/password`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( ( responseJson ) => {
        const { status } = responseJson;
        if ( status === 200 ) {
          this.submit();
        }
      } ).catch( ( err ) => {
        console.log( err, "error" );
      } );
  }

  submit() {
    const { navigation } = this.props;
    navigation.navigate( "PasswordEmail" );
  }

  render() {
    const { email, error } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader
          header={i18n.t( "inat_login.forgot_password_header" ).toLocaleUpperCase()}
        />
        <ScrollView>
          <View style={styles.margin} />
          <Text style={[styles.header, styles.marginHorizontal]}>
            {i18n.t( "inat_login.no_worries" )}
          </Text>
          <View style={[styles.leftTextMargins, styles.marginExtraLarge]}>
            <GreenText smaller text="inat_login.email" />
          </View>
          <InputField
            handleTextChange={value => this.setState( { email: value } )}
            placeholder="email"
            text={email}
            type="emailAddress"
          />
          {error
            ? <ErrorMessage error="email" />
            : <View style={styles.marginLarge} />}
          <GreenButton
            handlePress={() => this.checkEmail()}
            login
            text={i18n.t( "inat_login.reset" )}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ForgotPasswordScreen;
