// @flow

import React, { useContext } from "react";
import {
  Image,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";
import { getVersion, getBuildNumber } from "react-native-device-info";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/about";
import logos from "../assets/logos";
import i18n from "../i18n";
import { UserContext } from "./UserContext";
import ScrollWithHeader from "./UIComponents/ScrollWithHeader";
import PrivacyAndTerms from "./UIComponents/PrivacyAndTerms";

const AboutScreen = () => {
  const navigation = useNavigation();
  const appVersion = getVersion();
  const buildVersion = getBuildNumber();
  const { login } = useContext( UserContext );

  return (
    <ScrollWithHeader header="about.header">
      <View style={styles.textContainer}>
        <Image source={logos.iNat} />
        <View style={styles.marginSmall} />
        <Text style={[styles.text, styles.boldText]}>{i18n.t( "about.seek" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.joint_initiative" )}</Text>
        <View style={styles.block} />
        <Image source={logos.casNatGeo} style={styles.image} />
        <View style={styles.marginLarge} />
        <Text style={styles.text}>{i18n.t( "about.original" )}</Text>
        <View style={styles.margin} />
        <Image source={logos.wwfop} style={styles.wwfop} />
        <View style={styles.marginSmall} />
        <Image source={logos.hhmi} />
        <View style={styles.margin} />
        <Text style={[styles.text, styles.boldText]}>{i18n.t( "about.designed_by" )}</Text>
        <Text style={styles.text}>{i18n.t( "about.inat_team" )}</Text>
        <View style={styles.marginSmallest} />
        <Text style={styles.text}>{i18n.t( "about.translations" )}</Text>
        <View style={styles.marginSmallest} />
        <Text style={styles.text}>{i18n.t( "about.join_crowdin" )}</Text>
        <PrivacyAndTerms />
        <TouchableOpacity
          onPress={() => navigation.navigate( "DebugAndroid" )}
          style={styles.debug}
          disabled={Platform.OS === "ios" || !login}
          testID="debug"
        >
          <Text style={styles.greenText}>
            {i18n.t( "about.version" ).toLocaleUpperCase()}
            {` ${appVersion} (${buildVersion})`}
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          {i18n.t( "about.help" )}
        </Text>
        <View style={styles.block} />
      </View>
    </ScrollWithHeader>
  );
};

export default AboutScreen;
