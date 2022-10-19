// @flow

import * as React from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/uiComponents/privacyAndTerms";
import StyledText from "./StyledText";

const PrivacyAndTerms = (): React.Node => {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  const screens = ["Age", "LicensePhotos", "About"];
  const greenText = screens.includes( name );

  const linkStyles = [
    textStyles.textLink,
    greenText && textStyles.signupTextLink
  ];

  const navToPrivacy = ( ) => navigate( "Privacy" );
  const navToTerms = ( ) => navigate( "TermsOfService" );

  return (
    <View style={[viewStyles.center, viewStyles.row]}>
      <StyledText
        allowFontScaling={false}
        onPress={navToPrivacy}
        style={linkStyles}
      >
        {i18n.t( "inat_signup.privacy" )}
      </StyledText>
      <View style={viewStyles.marginLeft} />
      <StyledText
        allowFontScaling={false}
        onPress={navToTerms}
        style={linkStyles}
      >
        {i18n.t( "inat_signup.terms" )}
      </StyledText>
    </View>
  );
};

export default PrivacyAndTerms;
