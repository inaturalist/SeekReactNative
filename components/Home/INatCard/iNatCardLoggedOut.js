// @flow

import * as React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/home/inatCard";
import i18n from "../../../i18n";
import INatValueProps from "../../iNaturalist/iNatValueProps";
import INatLogin from "../../UIComponents/Login/iNatLogin";
import AppIconSubHeader from "../../iNaturalist/AppIconSubHeader";

type Props = {
  challenge: ?Object
}

const INatCardLoggedOut = ( challenge: Props ): React.Node => {
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
      <View style={viewStyles.textContainer}>
        <INatValueProps />
        <Pressable onPress={navToINatStats} >
          <Text style={textStyles.linkText}>
            {i18n.t( "about_inat.learn_more_about_inat" )}
          </Text>
        </Pressable>
        <INatLogin />
      </View>
    </>
  );
};

export default INatCardLoggedOut;
