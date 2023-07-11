// @flow

import React, { useContext } from "react";
import {
  Image,
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
import StyledText from "./UIComponents/StyledText";

const AboutScreen = (): Node => {
  const navigation = useNavigation();
  const appVersion = getVersion();
  const buildVersion = getBuildNumber();
  const { login } = useContext( UserContext );
  const { isTablet } = useContext( AppOrientationContext );

  const navToDebug = () => navigation.navigate( "DebugEmailScreen" );
  const disabled = !login;

  return (
    <ScrollWithHeader header="about.header" footer>
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <Image source={logos.iNat} />
        <View style={viewStyles.marginSmall} />
        <StyledText style={[textStyles.text, textStyles.boldText]}>{i18n.t( "about.seek_designed_by" )}</StyledText>
        <StyledText style={textStyles.text}>{i18n.t( "about.inat_team_credits_3" )}</StyledText>
        <View style={viewStyles.marginSmall} />
        <StyledText style={textStyles.text}>{i18n.t( "about.support_from" )}</StyledText>
        <View style={viewStyles.block} />
        <Image source={logos.casNatGeo} style={imageStyles.image} />
        <View style={viewStyles.marginSmall} />
        <Image source={logos.wwfop} style={imageStyles.wwfop} />
        <View style={viewStyles.marginSmall} />
        <Image source={logos.hhmi} />
        <View style={viewStyles.margin} />
        <StyledText style={textStyles.text}>{i18n.t( "about.translators" )}</StyledText>
        <View style={viewStyles.marginSmallest} />
        <StyledText style={textStyles.text}>{i18n.t( "about.join_crowdin" )}</StyledText>
        <PrivacyAndTerms login={login} />
        <TouchableOpacity
          onPress={navToDebug}
          style={viewStyles.debug}
          disabled={disabled}
          testID="debug"
        >
          <StyledText style={textStyles.greenText}>
            {i18n.t( "about.version" ).toLocaleUpperCase()}
            {` ${appVersion} (${buildVersion})`}
          </StyledText>
        </TouchableOpacity>
        <StyledText style={textStyles.text}>
          {i18n.t( "about.help" )}
        </StyledText>
        <View style={viewStyles.block} />
      </View>
    </ScrollWithHeader>
  );
};

export default AboutScreen;
