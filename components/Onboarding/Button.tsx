import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";

import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/onboarding";
import { baseTextStyles } from "../../styles/textStyles";
import StyledText from "../UIComponents/StyledText";

interface Props {
  index: number;
}

const Button = ( { index }: Props ) => {
  const navigation = useNavigation( );

  // TODO: navigation TS
  const navToHome = ( ) => navigation.navigate( "Drawer" );

  return (
    <TouchableOpacity
      onPress={navToHome}
      style={[viewStyles.buttonContainer, viewStyles.center]}
    >
      {index === 2
        ? (
          <View style={viewStyles.button}>
            <StyledText allowFontScaling={false} style={[baseTextStyles.button, textStyles.continue]}>
              {i18n.t( "onboarding.continue" ).toLocaleUpperCase( )}
            </StyledText>
          </View>
        ) : (
          <View style={viewStyles.buttonUncolored}>
            <StyledText allowFontScaling={false} style={[baseTextStyles.bodyWhite, textStyles.skipText]}>
              {i18n.t( "onboarding.skip" )}
            </StyledText>
          </View>
        )}
    </TouchableOpacity>
  );
};

export default Button;
