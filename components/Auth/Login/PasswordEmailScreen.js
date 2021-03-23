// @flow

import * as React from "react";
import { View, Text } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";

type Props = {
  +navigation: any
}

const PasswordEmailScreen = ( { navigation }: Props ) => (
  <ScrollWithHeader header="inat_login.forgot_password_header">
    <View style={styles.flexCenter}>
      <Text style={styles.greenHeaderText}>{i18n.t( "inat_login.check_email" ).toLocaleUpperCase()}</Text>
      <Text style={[styles.secondHeaderText, styles.email]}>
        {i18n.t( "inat_login.reset_instructions" )}
      </Text>
      <View style={styles.greenButtonMargin} />
      <GreenButton
        handlePress={() => navigation.navigate( "LoginOrSignup" )}
        login
        text="inat_login.return_login"
      />
    </View>
  </ScrollWithHeader>
);

export default PasswordEmailScreen;
