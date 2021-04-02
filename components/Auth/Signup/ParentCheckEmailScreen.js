// @flow

import * as React from "react";
import { View, Text } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/signup";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";

type Props = {
  +navigation: any
}

const ParentCheckEmailScreen = ( { navigation }: Props ): React.Node => (
  <ScrollWithHeader header="login.sign_up">
    <View style={styles.flexCenter}>
      <Text style={styles.headerText}>{i18n.t( "inat_signup.thanks" ).toLocaleUpperCase()}</Text>
      <Text style={styles.text}>{i18n.t( "inat_signup.parent_instructions" )}</Text>
      <View style={styles.marginTop} />
      <GreenButton
        fontSize={16}
        handlePress={() => navigation.navigate( "Drawer" )}
        login
        text="inat_signup.continue_no_log_in"
      />
    </View>
  </ScrollWithHeader>
);

export default ParentCheckEmailScreen;
