// @flow

import React from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/privacyAndTerms";

const PrivacyAndTerms = () => {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  console.log( name, "name in route" );

  return (
    <View style={[styles.center, styles.row]}>
      <Text
        allowFontScaling={false}
        style={[
          styles.textLink,
          name === "Age" && styles.signupTextLink
        ]}
        onPress={() => navigate( "Privacy" )}
      >
        {i18n.t( "inat_signup.privacy" )}
      </Text>
      <View style={styles.marginLeft} />
      <Text
        allowFontScaling={false}
        onPress={() => navigate( "TermsOfService" )}
        style={[
          styles.textLink,
          name === "Age" && styles.signupTextLink
        ]}
      >
        {i18n.t( "inat_signup.terms" )}
      </Text>
    </View>
  );
};

export default PrivacyAndTerms;
