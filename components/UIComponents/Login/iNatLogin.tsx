import { useNavigation } from "@react-navigation/native";
import * as React from "react";

import i18n from "../../../i18n";
import { textStyles } from "../../../styles/iNaturalist/iNatStats";
import { baseTextStyles } from "../../../styles/textStyles";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import StyledText from "../StyledText";

const INatLogin = ( ) => {
  const navigation = useNavigation( );

  const navToLogin = ( ) => navigation.navigate( "LoginOrSignup" );

  return (
    <>
      <StyledText style={[baseTextStyles.body, textStyles.loginLogoutText]}>
        {i18n.t( "about_inat.get_started_by_downloading_inat" )}
      </StyledText>
      <GreenButton
        handlePress={navToLogin}
        text="login.log_in"
      />
    </>
  );
};

export default INatLogin;
