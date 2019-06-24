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
  navigation: any
}

const LoginOrSignupScreen = ( { navigation }: Props ) => (
  <ImageBackground
    style={styles.container}
    source={backgrounds.splash}
  >
    <Image source={logoImages.seek} style={styles.logo} />
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.whiteButton}
        onPress={() => navigation.navigate( "LoginScreen" )}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "login.log_in" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.whiteButton}
        onPress={() => navigation.navigate( "Age" )}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "login.sign_up" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate( "Main" )}
      hitSlop={{
        left: 20,
        right: 20,
        top: 10,
        bottom: 10
      }}
    >
      <Text style={styles.textLink}>
        {i18n.t( "login.skip_login" )}
      </Text>
    </TouchableOpacity>
    <Text style={styles.text}>
      {i18n.t( "login.about" )}
    </Text>
  </ImageBackground>
);

export default LoginOrSignupScreen;
