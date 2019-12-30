// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/signup/signup";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenButton from "../UIComponents/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";
import ErrorMessage from "./ErrorMessage";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenText from "../UIComponents/GreenText";
import InputField from "../UIComponents/InputField";
import { checkIsEmailValid } from "../../utility/loginHelpers";
import { createJwtToken } from "../../utility/helpers";

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

    this.setLoading( true );
    const token = createJwtToken();

    const params = {
      email
    };

    const headers = {
      "Content-Type": "application/json"
    };

    if ( token ) {
      // $FlowFixMe
      headers.Authorization = `Authorization: ${token}`;
    }

    const site = "https://www.inaturalist.org";

    fetch( `${site}/users/parental_consent`, {
      method: "POST",
      body: JSON.stringify( params ),
      headers
    } )
      .then( ( responseJson ) => {
        const { status } = responseJson;
        if ( status === 200 || status === 404 ) {
          this.setLoading( false );
          this.submit();
        }
      } ).catch( ( err ) => {
        this.setError( err );
        this.setLoading( false );
      } );
  }

  submit() {
    const { navigation } = this.props;
    navigation.navigate( "ParentCheckEmail" );
  }

  render() {
    const { email, error, loading } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader header={i18n.t( "login.sign_up" )} />
        <ScrollView>
          <View style={styles.margin} />
          <Text style={styles.header}>
            {i18n.t( "inat_signup.enter_email" )}
          </Text>
          <Text style={[styles.text, styles.keyboardText]}>
            {i18n.t( "inat_signup.under_13" )}
          </Text>
          <View style={styles.margin} />
          <View style={styles.leftTextMargins}>
            <GreenText smaller text="inat_signup.parent_email" />
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
            text={i18n.t( "inat_signup.submit" )}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ParentalConsentScreen;
