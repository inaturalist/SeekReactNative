import React from "react";
import {
  Text,
  View,
  ScrollView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/privacy";
// import { capitalizeNames } from "../../utility/helpers";

const PrivacyPolicyScreen = () => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.textContainer}>
      <Text style={styles.text}>
        {i18n.t( "privacy.policy" )}
      </Text>
    </ScrollView>
  </View>
);

export default PrivacyPolicyScreen;
