import * as React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/home/inatCard";
import i18n from "../../../i18n";
import GreenButton from "../../UIComponents/Buttons/GreenButton";

const INatGetStarted = ( ) => {
  const navigation = useNavigation( );

  const navToLogin = ( ) => navigation.navigate( "LoginOrSignup" );

  return (
    <>
      <Text style={[textStyles.text, viewStyles.bullets]}>
        {i18n.t( "about_inat.get_started_by_downloading_inat" )}
      </Text>
      <View style={viewStyles.marginSmall} />
      <GreenButton
        handlePress={navToLogin}
        text="login.log_in"
      />
    </>
  );
};

export default INatGetStarted;
