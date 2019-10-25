// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import SafeAreaView from "../UIComponents/SafeAreaView";
import GreenText from "../UIComponents/GreenText";
import GreenButton from "../UIComponents/GreenButton";

type Props = {
  +navigation: any
}

const LoginSuccessScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView />
    <View style={styles.greenHeader}>
      <Text style={styles.loginSuccessHeaderText}>
        {i18n.t( "inat_signup.welcome" ).toLocaleUpperCase()}
      </Text>
    </View>
    <ScrollView>
      <View style={styles.center}>
        <Text style={styles.linkedAccountHeader}>{i18n.t( "inat_signup.linked_account" )}</Text>
      </View>
      <View style={styles.textContainer}>
        <GreenText smaller text={i18n.t( "inat_signup.posting" ).toLocaleUpperCase()} />
        <View style={{ marginTop: 5 }} />
        <Text style={styles.descriptionText}>{i18n.t( "inat_signup.posting_details" )}</Text>
        <View style={{ marginTop: 25 }} />
        <GreenText smaller text={i18n.t( "inat_signup.observations" ).toLocaleUpperCase()} />
        <View style={{ marginTop: 5 }} />
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
      <GreenButton
        handlePress={() => navigation.navigate( "Main" )}
        login
        text={i18n.t( "inat_signup.continue" ).toLocaleUpperCase()}
      />
      <View style={[styles.center, styles.row]}>
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
    </ScrollView>
  </View>
);

export default LoginSuccessScreen;
