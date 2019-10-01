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

type Props = {
  +navigation: any
}

const LoginSuccessScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <View style={styles.greenHeader}>
      <Text style={styles.loginSuccessHeaderText}>
        {i18n.t( "inat_signup.welcome" ).toLocaleUpperCase()}
      </Text>
    </View>
    <View style={styles.innerContainer}>
      <Text style={styles.linkedAccountHeader}>{i18n.t( "inat_signup.linked_account" )}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.smallGreenHeaderText}>{i18n.t( "inat_signup.posting" ).toLocaleUpperCase()}</Text>
      <Text style={styles.descriptionText}>{i18n.t( "inat_signup.posting_details" )}</Text>
      <View style={{ marginTop: 25 }} />
      <Text style={styles.smallGreenHeaderText}>
        {i18n.t( "inat_signup.observations" ).toLocaleUpperCase()}
      </Text>
      <Text style={styles.descriptionText}>
        {i18n.t( "inat_signup.observations_1" )}
        {" "}
        <Text style={{ textDecorationLine: "underline" }}>
          {i18n.t( "inat_signup.observations_2" )}
        </Text>
        {" "}
        {i18n.t( "inat_signup.observations_3" )}
      </Text>
    </View>
    <View style={{ marginTop: 29 }} />
    <View style={styles.innerContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main" )}
        style={[styles.greenButton, { width: "85%" }]}
      >
        <Text style={styles.buttonText}>
          {i18n.t( "inat_signup.continue" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          hitSlop={styles.clickableText}
          onPress={() => navigation.navigate( "Privacy" )}
        >
          <Text style={styles.textLink}>
            {i18n.t( "inat_signup.privacy" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={styles.clickableText}
          onPress={() => navigation.navigate( "TermsOfService" )}
        >
          <Text style={[styles.textLink, { marginLeft: 14 }]}>
            {i18n.t( "inat_signup.terms" )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default LoginSuccessScreen;
