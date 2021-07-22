// @flow

import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground
} from "react-native";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import { viewStyles, textStyles, imageStyles } from "../../styles/auth/loginOrSignup";
import logoImages from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import Button from "../UIComponents/Buttons/Button";
import { enabledLargeFonts } from "../../utility/textHelpers";

type Props = {
  +navigation: any
}

const LoginOrSignupScreen = ( { navigation }: Props ): React.Node => {
  const navToLogin = ( ) => navigation.navigate( "Login" );
  const navToAge = ( ) => navigation.navigate( "Age" );
  const navToDrawer = ( ) => navigation.navigate( "Drawer" );

  return (
    <ImageBackground
      source={backgrounds.login}
      style={viewStyles.container}
    >
      <ScrollView
        contentContainerStyle={[viewStyles.center, viewStyles.scrollContainer]}
        scrollEnabled={enabledLargeFonts()}
      >
        <Image source={logoImages.seek} style={imageStyles.logo} />
        <View style={viewStyles.margin} />
        <Button
          handlePress={navToLogin}
          text="login.log_in"
          color={colors.white}
          greenText
          login
        />
        <View style={viewStyles.marginSmall} />
        <Button
          handlePress={navToAge}
          text="login.sign_up"
          color={colors.white}
          greenText
          login
        />
        <View style={viewStyles.marginSmall} />
        <Button
          handlePress={navToDrawer}
          text="login.skip_login"
          large
          color={colors.white}
          greenText
          login
        />
        <View style={viewStyles.margin} />
        <Text style={textStyles.text}>
          {i18n.t( "login.about" )}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginOrSignupScreen;
