// @flow

import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Checkbox from "react-native-check-box";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import backgrounds from "../../assets/backgrounds";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

class SignUpScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      email: "",
      licensePhotos: false
    };
  }

  toggleLicensePhotos() {
    const { licensePhotos } = this.state;

    this.setState( {
      licensePhotos: !licensePhotos
    } );
  }

  submit() {
    const { navigation } = this.props;
    const { email, licensePhotos } = this.state;
    navigation.navigate( "Signup2", { email, licensePhotos } );
  }

  render() {
    const { email, licensePhotos } = this.state;
    const { navigation } = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={backgrounds.compass}
      >
        <Text style={styles.headerText}>{i18n.t( "inat_signup.sign_up_inat" )}</Text>
        <View style={styles.leftTextContainer}>
          <Text style={styles.leftText}>{i18n.t( "inat_signup.email" )}</Text>
        </View>
        <TextInput
          style={styles.inputField}
          onChangeText={ value => this.setState( { email: value } )}
          value={email}
          placeholder="email"
          textContentType="emailAddress"
          autoFocus
        />
        <View style={styles.row}>
          <Checkbox
            style={{ padding: 10 }}
            onClick={() => this.toggleLicensePhotos()}
            isChecked={licensePhotos}
            checkBoxColor={colors.white}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: 200 }}>
            <Text style={styles.licenseText}>{i18n.t( "inat_signup.release_photos" )}</Text>
            <Text
              style={[styles.textLink, { fontSize: 17, marginTop: 0 }]}
              onPress={() => navigation.navigate( "Privacy" )}
            >
              {i18n.t( "inat_signup.privacy" )}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => this.submit()}
        >
          <Text style={styles.buttonText}>{i18n.t( "inat_signup.next" )}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default SignUpScreen;
