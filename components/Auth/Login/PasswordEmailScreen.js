// @flow

import * as React from "react";
import { View } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../../UIComponents/StyledText";

type Props = {
  +navigation: any
}

const PasswordEmailScreen = ( { navigation }: Props ): React.Node => (
  <ScrollWithHeader header="inat_login.forgot_password_header">
    <View style={styles.flexCenter}>
      <StyledText style={styles.greenHeaderText}>{i18n.t( "inat_login.check_email" ).toLocaleUpperCase()}</StyledText>
      <StyledText style={[styles.secondHeaderText, styles.email]}>
        {i18n.t( "inat_login.reset_instructions" )}
      </StyledText>
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
