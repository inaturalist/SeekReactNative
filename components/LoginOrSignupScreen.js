// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import i18n from "../i18n";
import styles from "../styles/loginOrSignup";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";

type Props = {
  +navigation: any
}

const LoginOrSignupScreen = ( { navigation }: Props ) => (
  <ImageBackground
    source={backgrounds.splash}
    style={styles.container}
  >
    <Image source={logoImages.seek} style={styles.logo} />
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "LoginScreen" )}
        style={styles.whiteButton}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "login.log_in" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Age" )}
        style={styles.whiteButton}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "login.sign_up" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main" )}
        style={[styles.whiteButton, { height: 79, borderRadius: 100 }]}
      >
        <Text style={[styles.buttonText, { lineHeight: 24 }]}>
          {i18n.t( "login.skip_login" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.text}>
      {i18n.t( "login.about" )}
    </Text>
  </ImageBackground>
);

export default LoginOrSignupScreen;
