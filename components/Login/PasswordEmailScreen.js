// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../GreenHeader";

type Props = {
  navigation: any
}

const PasswordEmailScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <SafeAreaView style={styles.safeView}>
      <GreenHeader navigation={navigation} header={i18n.t( "login.sign_up" )} />
      <View style={[styles.innerContainer, styles.container]}>
        <Text style={styles.greenHeaderText}>{i18n.t( "inat_login.check_email" ).toLocaleUpperCase()}</Text>
        <Text style={[styles.secondHeaderText, {
          color: "black",
          marginHorizontal: 57,
          marginTop: 21
        }]}
        >
          {i18n.t( "inat_login.reset_instructions" )}
        </Text>
        <View style={{ marginTop: 51 }} />
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate( "LoginOrSignup" )}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "inat_login.return_login" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
);

export default PasswordEmailScreen;
