import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
import GreenText from "../UIComponents/GreenText";
import INatValueProps from "./iNatValueProps";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import AppIconSubHeader from "./AppIconSubHeader";
import { useAppOrientation } from "../Providers/AppOrientationProvider";

const INatHeaderLoggedOut = ( ) => {
  const navigation = useNavigation( );
  const logIntoiNat = ( ) => navigation.navigate( "LoginOrSignup" );
  const { isTablet } = useAppOrientation( );

  return (
    <>
      <AppIconSubHeader
        text={i18n.t( "about_inat.log_in_to_post_observations" )}
        icon="inat"
        largeIcon
      />
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <View style={viewStyles.greenButtonMargins}>
          <GreenButton
            handlePress={logIntoiNat}
            text="about_inat.log_in_with_inat"
          />
        </View>
        <GreenText text="about_inat.use_inat_to" />
        <INatValueProps />
      </View>
    </>
  );
};

export default INatHeaderLoggedOut;
