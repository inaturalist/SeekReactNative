// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import logoImages from "../../assets/logos";

type Props = {
  navigation: any
}

const LoginScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <Image source={logoImages.seek} />
      <TouchableOpacity
        onPress={() => navigation.navigate( "iNatLogin" )}
      >
        <Text style={styles.text}>
          {i18n.t( "login.log_in" )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Age" )}
      >
        <Text style={styles.text}>
          {i18n.t( "login.sign_up" )}
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        {i18n.t( "login.or" ).toLocaleUpperCase()}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main", {
          taxaName: null,
          id: null,
          taxaType: "all",
          latitude: null,
          longitude: null
        } )}
      >
        <Text style={styles.text}>
          {i18n.t( "login.skip_login" )}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default LoginScreen;
