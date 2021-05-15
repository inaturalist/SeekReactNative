// @flow

import * as React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/home/inatCard";
import logos from "../../../assets/logos";
import GreenText from "../../UIComponents/GreenText";
import i18n from "../../../i18n";
import useLatestChallenge from "../Challenges/hooks/challengeCardHooks";
import INatValueProps from "../../iNaturalist/iNatValueProps";
import INatLogin from "../../iNaturalist/iNatLogin";

const INatCardLoggedOut = ( ): React.Node => {
  const navigation = useNavigation( );
  const challenge = useLatestChallenge( );

  const navToINatStats = ( ) => navigation.navigate( "iNatStats" );

  return (
    <View style={[viewStyles.container, challenge && viewStyles.topMarginWithChallenge]}>
      <GreenText text="about_inat.inaturalist" />
      <View style={[viewStyles.row, viewStyles.center, viewStyles.secondHeader]}>
        <Image source={logos.iNatAppIcon} />
        <Text style={textStyles.secondHeaderText}>
          {challenge
            ? i18n.t( "about_inat.dive_deeper_with_inat" )
            : i18n.t( "about_inat.we_think_youll_like_inat" )}
        </Text>
      </View>
      <INatValueProps />
      <Pressable onPress={navToINatStats} >
        <Text style={textStyles.linkText}>
          {i18n.t( "about_inat.learn_more_about_inat" )}
        </Text>
      </Pressable>
      <INatLogin />
    </View>
  );
};

export default INatCardLoggedOut;
