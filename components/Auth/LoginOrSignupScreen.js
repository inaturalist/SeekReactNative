// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import styles from "../../styles/auth/loginOrSignup";
import logoImages from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import Button from "../UIComponents/Buttons/Button";
import { enabledLargeFonts } from "../../utility/textHelpers";

type Props = {
  +navigation: any
}

const LoginOrSignupScreen = ( { navigation }: Props ) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={backgrounds.login}
      style={styles.container}
    >
      <ScrollView
        style={{ paddingTop: insets.top }}
        contentContainerStyle={[styles.center, styles.scrollContainer]}
        scrollEnabled={enabledLargeFonts()}
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
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginOrSignupScreen;
