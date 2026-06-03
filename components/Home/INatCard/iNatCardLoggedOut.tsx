import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Pressable, View } from "react-native";

import i18n from "../../../i18n";
import { textStyles, viewStyles } from "../../../styles/home/inatCard";
import { baseTextStyles } from "../../../styles/textStyles";
import AppIconSubHeader from "../../iNaturalist/AppIconSubHeader";
import INatValueProps from "../../iNaturalist/iNatValueProps";
import INatLogin from "../../UIComponents/Login/iNatLogin";
import StyledText from "../../UIComponents/StyledText";

interface Props {
  challenge?: boolean;
}

const INatCardLoggedOut = ( { challenge }: Props ) => {
  const navigation = useNavigation( );
  const navToINatStats = ( ) => navigation.navigate( "iNatStats" );

  return (
    <>
      <AppIconSubHeader
        text={challenge
          ? i18n.t( "about_inat.dive_deeper_with_inat" )
          : i18n.t( "about_inat.we_think_youll_like_inat" )}
        icon="inat"
      />
      <View style={[viewStyles.textContainer, viewStyles.marginBottom]}>
        <INatValueProps />
        <Pressable onPress={navToINatStats} >
          <StyledText style={[baseTextStyles.bodyGreen, textStyles.linkText]}>
            {i18n.t( "about_inat.learn_more_about_inat" )}
          </StyledText>
        </Pressable>
        <INatLogin />
      </View>
    </>
  );
};

export default INatCardLoggedOut;
