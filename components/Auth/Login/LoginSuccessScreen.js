// @flow

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import GreenText from "../../UIComponents/GreenText";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import PrivacyAndTerms from "../../UIComponents/PrivacyAndTerms";

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
      <PrivacyAndTerms />
    </ScrollWithHeader>
  );
};

export default LoginSuccessScreen;
