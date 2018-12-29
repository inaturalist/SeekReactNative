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
      <TouchableOpacity>
        <Text>
          {i18n.t( "login.log_in" )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>
          {i18n.t( "login.sign_up" )}
        </Text>
      </TouchableOpacity>
      <Text>
        {i18n.t( "login.or" ).toLocaleUpperCase()}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main" )}
      >
        <Text>
          {i18n.t( "login.skip_login" )}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default LoginScreen;
