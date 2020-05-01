// @flow

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenText from "../UIComponents/GreenText";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../UIComponents/ScrollWithHeader";

const LoginSuccessScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ScrollWithHeader header="inat_signup.welcome">
      <View style={styles.center}>
        <Text style={styles.linkedAccountHeader}>{i18n.t( "inat_signup.linked_account" )}</Text>
      </View>
      <View style={styles.textContainer}>
        <GreenText smaller text="inat_signup.posting" />
        <View style={styles.marginSmall} />
        <Text style={styles.descriptionText}>{i18n.t( "inat_signup.posting_details" )}</Text>
        <View style={styles.marginMedium} />
        <GreenText smaller text="inat_signup.observations" />
        <View style={styles.marginSmall} />
        <Text style={styles.descriptionText}>
          {i18n.t( "inat_signup.observations_1" )}
          {" "}
          <Text style={styles.underline}>
            {i18n.t( "inat_signup.observations_2" )}
          </Text>
          {" "}
          {i18n.t( "inat_signup.observations_3" )}
        </Text>
      </View>
      <View style={styles.marginLarge} />
      <GreenButton
        handlePress={() => navigate( "Drawer" )}
        login
        text="inat_signup.continue"
      />
      <View style={[styles.center, styles.row]}>
        <Text
          allowFontScaling={false}
          style={styles.textLink}
          onPress={() => navigate( "Privacy" )}
        >
          {i18n.t( "inat_signup.privacy" )}
        </Text>
        <Text
          allowFontScaling={false}
          onPress={() => navigate( "TermsOfService" )}
          style={[styles.textLink, styles.marginLeft]}
        >
          {i18n.t( "inat_signup.terms" )}
        </Text>
      </View>
    </ScrollWithHeader>
  );
};

export default LoginSuccessScreen;
