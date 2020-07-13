// @flow

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";

const PrivacyAndTerms = () => {
  const { navigate } = useNavigation();

  return (
    <View style={[styles.center, styles.row]}>
      <Text
        allowFontScaling={false}
        style={styles.textLink}
        onPress={() => navigate( "Login", { screen: "Privacy" } )}
      >
        {i18n.t( "inat_signup.privacy" )}
      </Text>
      <Text
        allowFontScaling={false}
        onPress={() => navigate( "Login", { screen: "TermsOfService" } )}
        style={[styles.textLink, styles.marginLeft]}
      >
        {i18n.t( "inat_signup.terms" )}
      </Text>
    </View>
  );
};

export default PrivacyAndTerms;
