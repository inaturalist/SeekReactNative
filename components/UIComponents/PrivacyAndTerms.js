// @flow

import * as React from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/privacyAndTerms";

const PrivacyAndTerms = (): React.Node => {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  const screens = ["Age", "LicensePhotos", "About"];
  const greenText = screens.includes( name );

  return (
    <View style={[styles.center, styles.row]}>
      <Text
        allowFontScaling={false}
        onPress={() => navigate( "Privacy" )}
        style={[
          styles.textLink,
          greenText && styles.signupTextLink
        ]}
      >
        {i18n.t( "inat_signup.privacy" )}
      </Text>
      <View style={styles.marginLeft} />
      <Text
        allowFontScaling={false}
        onPress={() => navigate( "TermsOfService" )}
        style={[
          styles.textLink,
          greenText && styles.signupTextLink
        ]}
      >
        {i18n.t( "inat_signup.terms" )}
      </Text>
    </View>
  );
};

export default PrivacyAndTerms;
