// @flow
import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../styles/onboarding";
import i18n from "../../i18n";

type Props = {
  index: number
}

const Button = ( { index }: Props ): React.Node => {
  const navigation = useNavigation( );

  const navToHome = ( ) => navigation.navigate( "Drawer" );

  return (
    <TouchableOpacity
      onPress={navToHome}
      style={[viewStyles.buttonContainer, viewStyles.center]}
    >
      {index === 2
        ? (
          <View style={viewStyles.button}>
            <Text allowFontScaling={false} style={textStyles.continue}>
              {i18n.t( "onboarding.continue" ).toLocaleUpperCase( )}
            </Text>
          </View>
        ) : (
          <Text allowFontScaling={false} style={[textStyles.skipText, textStyles.buttonHeight]}>
            {i18n.t( "onboarding.skip" )}
          </Text>
        )}
    </TouchableOpacity>
  );
};

export default Button;
