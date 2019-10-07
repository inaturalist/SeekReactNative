// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/signup/signup";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";

type Props = {
  +navigation: any
}

const ParentCheckEmailScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView />
    <GreenHeader header={i18n.t( "login.sign_up" )} navigation={navigation} />
    <View style={[styles.innerContainer, styles.container]}>
      <Text style={styles.headerText}>{i18n.t( "inat_signup.thanks" ).toLocaleUpperCase()}</Text>
      <Text style={styles.text}>{i18n.t( "inat_signup.parent_instructions" )}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main" )}
        style={[styles.greenButton, styles.greenButtonMargin, { marginTop: 51 }]}
      >
        <Text style={[styles.buttonText, { fontSize: 16 }]}>
          {i18n.t( "inat_signup.continue_no_log_in" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ParentCheckEmailScreen;
