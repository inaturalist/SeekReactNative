// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";

import i18n from "../i18n";
import { colors } from "../styles/global";
import styles from "../styles/loginOrSignup";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import Button from "./UIComponents/Buttons/Button";

type Props = {
  +navigation: any
}

const LoginOrSignupScreen = ( { navigation }: Props ) => (
  <ImageBackground
    source={backgrounds.login}
    style={[styles.container, styles.center]}
  >
    <Image source={logoImages.seek} style={styles.logo} />
    <View style={styles.margin} />
    <Button
      handlePress={() => navigation.navigate( "Login" )}
      text="login.log_in"
      color={colors.white}
      greenText
      login
    />
    <View style={styles.marginSmall} />
    <Button
      handlePress={() => navigation.navigate( "Age" )}
      text="login.sign_up"
      color={colors.white}
      greenText
      login
    />
    <View style={styles.marginSmall} />
    <Button
      handlePress={() => navigation.navigate( "Drawer" )}
      text="login.skip_login"
      large
      color={colors.white}
      greenText
      login
    />
    <View style={styles.margin} />
    <Text style={styles.text}>
      {i18n.t( "login.about" )}
    </Text>
  </ImageBackground>
);

export default LoginOrSignupScreen;
