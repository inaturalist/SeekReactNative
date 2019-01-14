import React from "react";
import {
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/privacy";
import { capitalizeNames } from "../../utility/helpers";

const PrivacyPolicyScreen = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {capitalizeNames( i18n.t( "inat_signup.privacy" ) )}
      </Text>
    </View>
  </View>
);

export default PrivacyPolicyScreen;
