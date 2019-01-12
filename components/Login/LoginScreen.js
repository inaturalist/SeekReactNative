// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import logoImages from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";

type Props = {
  navigation: any
}

const LoginScreen = ( { navigation }: Props ) => (
  <ImageBackground
    style={styles.container}
    source={backgrounds.splash}
  >
    <Image source={logoImages.seek} style={styles.logo} />
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => navigation.navigate( "iNatLogin" )}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "login.log_in" )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => navigation.navigate( "Welcome" )}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "login.sign_up" )}
        </Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate( "Main", {
        taxaName: null,
        id: null,
        taxaType: "all",
        latitude: null,
        longitude: null
      } )}
    >
      <Text style={styles.textLink}>
        {i18n.t( "login.skip_login" )}
      </Text>
    </TouchableOpacity>
    <View style={styles.aboutTextContainer}>
      <Text style={styles.text}>
        {i18n.t( "login.about" )}
      </Text>
    </View>
  </ImageBackground>
);

export default LoginScreen;
