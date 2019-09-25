// @flow

import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import Checkbox from "react-native-check-box";

import i18n from "../../i18n";
import styles from "../../styles/signup/signup";
import GreenHeader from "../GreenHeader";
import { checkIsEmailValid } from "../../utility/loginHelpers";
import ErrorMessage from "./ErrorMessage";

type Props = {
  navigation: any
}

class LicensePhotosScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      email: "",
      licensePhotos: true,
      error: false
    };
  }

  setError( error ) {
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
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader navigation={navigation} header={i18n.t( "login.sign_up" )} />
          <View style={styles.innerContainer}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_signup.email" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { email: value } )}
              value={email}
              placeholder="email"
              placeholderTextColor="#828282"
              textContentType="emailAddress"
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
            />
            <View style={[styles.row, styles.margin]}>
              <Checkbox
                style={styles.checkBox}
                onClick={() => this.toggleLicensePhotos()}
                isChecked={licensePhotos}
                checkBoxColor="#979797"
              />
              <Text style={styles.licenseText}>
                {i18n.t( "inat_signup.release_photos" )}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={{ marginLeft: 15 }} />
              <Text
                style={[styles.privacy, { marginTop: 2 }]}
                onPress={() => navigation.navigate( "Privacy" )}
              >
                {i18n.t( "inat_signup.privacy" )}
              </Text>
              <Text
                style={[styles.privacy, { marginTop: 2, marginLeft: 14 }]}
                onPress={() => navigation.navigate( "TermsOfService" )}
              >
                {i18n.t( "inat_signup.terms" )}
              </Text>
            </View>
            {error ? <ErrorMessage error="email" /> : <View style={{ marginTop: 29 }} />}
            <TouchableOpacity
              style={[styles.greenButton]}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_signup.next" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default LicensePhotosScreen;
