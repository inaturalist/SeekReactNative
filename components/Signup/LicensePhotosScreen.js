// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import Checkbox from "react-native-check-box";

import i18n from "../../i18n";
import styles from "../../styles/signup/signup";
import { checkIsEmailValid } from "../../utility/loginHelpers";
import ErrorMessage from "./ErrorMessage";
import InputField from "../UIComponents/InputField";
import GreenText from "../UIComponents/GreenText";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../UIComponents/ScrollWithHeader";

type Props = {
  +navigation: any
}

type State = {
  email: string,
  licensePhotos: boolean,
  error: boolean
}

class LicensePhotosScreen extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      email: "",
      licensePhotos: true,
      error: false
    };
  }

  setError( error: boolean ) {
    this.setState( { error } );
  }

  toggleLicensePhotos() {
    const { licensePhotos } = this.state;

    this.setState( { licensePhotos: !licensePhotos } );
  }

  submit() {
    const { navigation } = this.props;
    const { email, licensePhotos } = this.state;
    if ( checkIsEmailValid( email ) ) {
      this.setError( false );
      navigation.navigate( "Signup", { email, licensePhotos } );
    } else {
      this.setError( true );
    }
  }

  render() {
    const { email, licensePhotos, error } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollWithHeader header="login.sign_up">
        <View style={styles.leftTextMargins}>
          <GreenText allowFontScaling={false} smaller text="inat_signup.email" />
        </View>
        <InputField
          handleTextChange={value => this.setState( { email: value } )}
          placeholder={i18n.t( "inat_signup.email" )}
          text={email}
          type="emailAddress"
        />
        <View style={[styles.row, styles.margin]}>
          <Checkbox
            checkBoxColor="#979797"
            isChecked={licensePhotos}
            onClick={() => this.toggleLicensePhotos()}
            style={styles.checkBox}
          />
          <Text allowFontScaling={false} style={styles.licenseText}>
            {i18n.t( "inat_signup.release_photos" )}
          </Text>
        </View>
        <View style={[styles.row, styles.marginLeft]}>
          <Text
            allowFontScaling={false}
            onPress={() => navigation.navigate( "Privacy" )}
            style={[styles.privacy, styles.marginSmall]}
          >
            {i18n.t( "inat_signup.privacy" )}
          </Text>
          <Text
            allowFontScaling={false}
            onPress={() => navigation.navigate( "TermsOfService" )}
            style={[styles.privacy, styles.marginSmall, styles.marginLeftSmall]}
          >
            {i18n.t( "inat_signup.terms" )}
          </Text>
        </View>
        {error ? <ErrorMessage error="email" /> : <View style={styles.greenButtonMargin} />}
        <GreenButton
          handlePress={() => this.submit()}
          login
          text="inat_signup.next"
        />
      </ScrollWithHeader>
    );
  }
}

export default LicensePhotosScreen;
