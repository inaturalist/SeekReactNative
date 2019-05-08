// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/signup/signup";
import GreenHeader from "../GreenHeader";

type Props = {
  navigation: any
}

const ParentCheckEmailScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <SafeAreaView style={styles.safeView}>
      <GreenHeader navigation={navigation} header={i18n.t( "login.sign_up" )} />
      <View style={[styles.innerContainer, { flex: 1 }]}>
        <Text style={styles.headerText}>{i18n.t( "inat_signup.thanks" ).toLocaleUpperCase()}</Text>
        <Text style={styles.text}>{i18n.t( "inat_signup.parent_instructions" )}</Text>
        <View style={{ marginTop: 51 }} />
        <TouchableOpacity
          style={[styles.greenButton, { width: 340 }]}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "inat_signup.continue_no_log_in" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
);

export default ParentCheckEmailScreen;
