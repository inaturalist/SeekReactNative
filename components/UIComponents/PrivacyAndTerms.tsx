import * as React from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/uiComponents/privacyAndTerms";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  login?: boolean;
}

const PrivacyAndTerms = ( { login }: Props ) => {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  const screens = ["Age", "LicensePhotos", "About"];
  const greenText = screens.includes( name );

  const linkStyles = greenText ? [baseTextStyles.bodyGreen, textStyles.signupTextLink] : [baseTextStyles.regular, textStyles.textLink];

  // TODO: navigation TS
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
      {login && <View style={viewStyles.marginLeft} />}
      {login && (
        <StyledText
          allowFontScaling={false}
          onPress={navToTerms}
          style={linkStyles}
        >
          {i18n.t( "inat_signup.terms" )}
        </StyledText>
      )}
    </View>
  );
};

export default PrivacyAndTerms;
