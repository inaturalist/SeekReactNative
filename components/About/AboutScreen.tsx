import React, { useContext } from "react";
import {
  Image,
  View,
  TouchableOpacity
} from "react-native";
import { getVersion, getBuildNumber } from "react-native-device-info";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, imageStyles, textStyles } from "../../styles/about";
import logos from "../../assets/logos";
import i18n from "../../i18n";
import { UserContext } from "../UserContext";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import PrivacyAndTerms from "../UIComponents/PrivacyAndTerms";
import StyledText from "../UIComponents/StyledText";
import EmailText from "./EmailText";
import { baseTextStyles } from "../../styles/textStyles";
import { useAppOrientation } from "../Providers/AppOrientationProvider";

const AboutScreen = ( ) => {
  const navigation = useNavigation();
  const appVersion = getVersion();
  const buildVersion = getBuildNumber();
  const { login } = useContext( UserContext );
  const { isTablet } = useAppOrientation( );

  const navToDebug = () => navigation.navigate( "DebugEmailScreen" );
  const disabled = !login;

  return (
    <ScrollWithHeader header="about.header" footer>
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <Image source={logos.iNat} />
        <View style={viewStyles.marginSmall} />
        <StyledText style={[baseTextStyles.bodyBold, textStyles.boldText]}>{i18n.t( "about.seek_designed_by" )}</StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "about.inat_team_credits_5" )}</StyledText>
        <View style={viewStyles.marginSmall} />
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "about.support_from" )}</StyledText>
        <View style={viewStyles.block} />
        <Image source={logos.casNatGeo} style={imageStyles.image} />
        <View style={viewStyles.marginSmall} />
        <Image source={logos.wwfop} style={imageStyles.wwfop} />
        <View style={viewStyles.marginSmall} />
        <Image source={logos.hhmi} />
        <View style={viewStyles.margin} />
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "about.translators" )}</StyledText>
        <View style={viewStyles.marginSmallest} />
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "about.join_crowdin" )}</StyledText>
        <PrivacyAndTerms login={login} />
        <TouchableOpacity
          onPress={navToDebug}
          style={viewStyles.debug}
          disabled={disabled}
          testID="debug"
        >
          <StyledText style={baseTextStyles.highlight}>
            {i18n.t( "about.version" ).toLocaleUpperCase()}
            {` ${appVersion} (${buildVersion})`}
          </StyledText>
        </TouchableOpacity>
        <EmailText />
        <View style={viewStyles.block} />
      </View>
    </ScrollWithHeader>
  );
};

export default AboutScreen;
