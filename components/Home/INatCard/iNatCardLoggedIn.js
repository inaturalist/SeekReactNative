// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";

import { viewStyles, textStyles } from "../../../styles/home/inatCard";
import logos from "../../../assets/logos";
import GreenText from "../../UIComponents/GreenText";
import i18n from "../../../i18n";

import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";
import BulletedList from "../../iNaturalist/BulletedList";
import useLatestChallenge from "../Challenges/hooks/challengeCardHooks";

const INatCardLoggedIn = ( ): React.Node => {
  const challenge = useLatestChallenge( );

  const openAppOrDownloadPage = ( ) => console.log( "tbd" );

  return (
    <View style={[viewStyles.container, challenge && viewStyles.topMarginWithChallenge]}>
      <GreenText text="about_inat.inaturalist" />
      <View style={[viewStyles.row, viewStyles.center, viewStyles.secondHeader]}>
        <Image source={logos.iNatAppIcon} />
        <View>
        <Text style={textStyles.lightText}>
          {i18n.t( "about_inat.you_are_logged_in" )}
        </Text>
        <Text style={textStyles.secondHeaderText}>
          {i18n.t( "about_inat.welcome_back", { username: "@amanda" } )}
        </Text>
        </View>
      </View>
      {[1, 2].map( item => (
        <BulletedList text={`about_inat.logged_in_bullet_${item}`} />
      ) )}
      <View style={viewStyles.marginOpenINat} />
      <GreenButton
        color={colors.seekiNatGreen}
        text="about_inat.open_inaturalist"
        handlePress={openAppOrDownloadPage}
      />
    </View>
  );
};

export default INatCardLoggedIn;
