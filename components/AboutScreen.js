// @flow

import React, { useContext } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { getVersion, getBuildNumber } from "react-native-device-info";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { viewStyles, imageStyles, textStyles } from "../styles/about";
import logos from "../assets/logos";
import i18n from "../i18n";
import { AppOrientationContext, UserContext } from "./UserContext";
import ScrollWithHeader from "./UIComponents/Screens/ScrollWithHeader";
import PrivacyAndTerms from "./UIComponents/PrivacyAndTerms";

const AboutScreen = (): Node => {
  const navigation = useNavigation();
  const appVersion = getVersion();
  const buildVersion = getBuildNumber();
  const { login } = useContext( UserContext );
  const { isLandscape } = useContext( AppOrientationContext );

  const navToDebug = () => navigation.navigate( "DebugEmailScreen" );
  const disabled = !login;

  return (
    <ScrollWithHeader header="about.header">
      <View style={[viewStyles.textContainer, isLandscape && viewStyles.landscapeContainer]}>
        <Image source={logos.iNat} />
        <View style={viewStyles.marginSmall} />
        <Text style={[textStyles.text, textStyles.boldText]}>{i18n.t( "about.seek" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "about.joint_initiative" )}</Text>
        <View style={viewStyles.block} />
        <Image source={logos.casNatGeo} style={imageStyles.image} />
        <View style={viewStyles.marginLarge} />
        <Text style={textStyles.text}>{i18n.t( "about.original" )}</Text>
        <View style={viewStyles.margin} />
        <Image source={logos.wwfop} style={imageStyles.wwfop} />
        <View style={viewStyles.marginSmall} />
        <Image source={logos.hhmi} />
        <View style={viewStyles.margin} />
        <Text style={[textStyles.text, textStyles.boldText]}>{i18n.t( "about.designed_by" )}</Text>
        <Text style={textStyles.text}>{i18n.t( "about.inat_team" )}</Text>
        <View style={viewStyles.marginSmallest} />
        <Text style={textStyles.text}>{i18n.t( "about.translations" )}</Text>
        <View style={viewStyles.marginSmallest} />
        <Text style={textStyles.text}>{i18n.t( "about.join_crowdin" )}</Text>
        {login && <PrivacyAndTerms />}
        <TouchableOpacity
          onPress={navToDebug}
          style={viewStyles.debug}
          disabled={disabled}
          testID="debug"
        >
          <Text style={textStyles.greenText}>
            {i18n.t( "about.version" ).toLocaleUpperCase()}
            {` ${appVersion} (${buildVersion})`}
          </Text>
        </TouchableOpacity>
        <Text style={textStyles.text}>
          {i18n.t( "about.help" )}
        </Text>
        <View style={viewStyles.block} />
      </View>
    </ScrollWithHeader>
  );
};

export default AboutScreen;
