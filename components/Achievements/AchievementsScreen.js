// @flow

import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import LevelHeader from "./LevelHeader";
import SpeciesBadges from "./SpeciesBadges";
import ChallengeBadges from "./ChallengeBadges";
import GreenText from "../UIComponents/GreenText";
import LoginCard from "../UIComponents/LoginCard";
import Spacer from "../UIComponents/TopSpacer";
import { localizeNumber, setRoute } from "../../utility/helpers";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import BannerHeader from "./BannerHeader";
import useFetchAchievements from "./hooks/achievementHooks";

const AchievementsScreen = ( ): Node => {
  const state = useFetchAchievements( );
  const navigation = useNavigation( );

  const navToObservations = useCallback( () => {
    setRoute( "Achievements" );
    navigation.navigate( "Observations" );
  }, [navigation] );

  return (
    <ScrollWithHeader header="badges.achievements" loading={state.level === null}>
      <Spacer backgroundColor={colors.greenGradientDark} />
      {state.level && (
        <LevelHeader
          level={state.level}
          nextLevelCount={state.nextLevelCount}
          speciesCount={state.speciesCount}
        />
      )}
      <BannerHeader text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()} />
      <SpeciesBadges speciesBadges={state.speciesBadges} />
      <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
      <ChallengeBadges />
      <View style={[viewStyles.row, viewStyles.center]}>
        <TouchableOpacity
          onPress={navToObservations}
          style={viewStyles.secondHeaderText}
        >
          <GreenText center smaller text="badges.observed" />
          <Text style={textStyles.number}>{state.speciesCount && localizeNumber( state.speciesCount )}</Text>
        </TouchableOpacity>
        <View style={viewStyles.secondHeaderText}>
          <GreenText center smaller text="badges.earned" />
          <Text style={textStyles.number}>{state.badgesEarned && localizeNumber( state.badgesEarned )}</Text>
        </View>
      </View>
      <View style={viewStyles.center}>
        <LoginCard />
      </View>
    </ScrollWithHeader>
  );
};

export default AchievementsScreen;
