// @flow

import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  ScrollView
} from "react-native";
import jwt from "react-native-jwt-io";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../UIComponents/GreenHeader";
import config from "../../config";
import { checkIsEmailValid } from "../../utility/loginHelpers";
import ErrorMessage from "../Signup/ErrorMessage";

type Props = {
  +navigation: any
}

class ForgotPasswordScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      email: "",
      error: false
    };
  }

  setError( error ) {
    this.setState( { error } );
  }

  createJwtToken() {
    const claims = {
      application: "SeekRN",
      exp: new Date().getTime() / 1000 + 300
    };

    const token = jwt.encode( claims, config.jwtSecret, "HS512" );
    return token;
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

    const token = this.createJwtToken();

    const params = {
      user: {
        email
      }
    };

    const headers = {
      "Content-Type": "application/json"
    };

    if ( token ) {
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
    const { navigation } = this.props;
    const { email, error } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <GreenHeader
          header={i18n.t( "inat_login.forgot_password_header" ).toLocaleUpperCase()}
          navigation={navigation}
        />
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View style={styles.margin} />
          <Text style={[styles.header, { marginHorizontal: 23 }]}>
            {i18n.t( "inat_login.no_worries" )}
          </Text>
          <View style={[styles.leftTextContainer, { marginTop: 31 }]}>
            <Text style={styles.leftText}>
              {i18n.t( "inat_login.email" ).toLocaleUpperCase()}
            </Text>
          </View>
          <TextInput
            autoCapitalize="none"
            autoFocus
            keyboardType={Platform.OS === "android" ? "visible-password" : "email-address"}
            onChangeText={ value => this.setState( { email: value } )}
            placeholder="email address"
            placeholderTextColor="#828282"
            style={styles.inputField} // adding this to turn off autosuggestions on Android
            textContentType="emailAddress"
            value={email}
          />
          {error ? (
            <View style={{ marginTop: 29 }}>
              <ErrorMessage error="email" />
            </View>
          ) : <View style={{ marginTop: 29 }} />}
          <TouchableOpacity
            onPress={() => this.checkEmail()}
            style={[styles.greenButton, styles.greenButtonMargin]}
          >
            <Text style={styles.buttonText}>
              {i18n.t( "inat_login.reset" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default ForgotPasswordScreen;
