// @flow

import React from "react";
import {
  View,
  Text
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenButton from "../UIComponents/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";

type Props = {
  +navigation: any
}

const PasswordEmailScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView />
    <GreenHeader header={i18n.t( "login.sign_up" )} navigation={navigation} />
    <View style={styles.flexCenter}>
      <Text style={styles.greenHeaderText}>{i18n.t( "inat_login.check_email" ).toLocaleUpperCase()}</Text>
      <Text style={[styles.secondHeaderText, styles.email]}
      >
        {i18n.t( "inat_login.reset_instructions" )}
      </Text>
      <View style={styles.greenButtonMargin} />
      <GreenButton
        handlePress={() => navigation.navigate( "LoginOrSignup" )}
        login
        text={i18n.t( "inat_login.return_login" )}
      />
    </View>
  </View>
);

export default PasswordEmailScreen;
