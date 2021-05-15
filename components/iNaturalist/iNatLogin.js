// @flow

import * as React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { textStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
import GreenButton from "../UIComponents/Buttons/GreenButton";

const INatLogIn = ( ): React.Node => {
  const navigation = useNavigation( );

  const navToLogin = ( ) => navigation.navigate( "LoginOrSignup" );

  return (
    <>
      <Text style={[textStyles.text, textStyles.loginLogoutText]}>
        {i18n.t( "about_inat.get_started_by_downloading_inat" )}
      </Text>
      <GreenButton
        handlePress={navToLogin}
        text="login.log_in"
      />
    </>
  );
};

export default INatLogIn;
