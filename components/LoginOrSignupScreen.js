// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";

import i18n from "../i18n";
import styles from "../styles/loginOrSignup";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import backStyles from "../styles/backArrow";
import icons from "../assets/icons";

const { height } = Dimensions.get( "window" );

type Props = {
  navigation: any
}

const LoginOrSignupScreen = ( { navigation }: Props ) => (
  <ImageBackground
    style={styles.container}
    source={backgrounds.splash}
  >
    {navigation.state && navigation.state.params && navigation.state.params.backArrow ? (
      <TouchableOpacity
        hitSlop={backStyles.touchable}
        style={[backStyles.backButton, { position: "absolute", top: height > 670 ? 58 : 18 }]}
        onPress={() => navigation.navigate( "iNatStats" )}
      >
        <Image source={icons.backButton} />
      </TouchableOpacity>
    ) : null}
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
