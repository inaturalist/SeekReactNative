// @flow

import React, { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import LevelHeader from "./LevelHeader";
import SpeciesBadges from "./SpeciesBadges";
import ChallengeBadges from "./ChallengeBadges";
import GreenText from "../UIComponents/GreenText";
import LoginCard from "../UIComponents/Login/LoginCard";
import Spacer from "../UIComponents/TopSpacer";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import BannerHeader from "../UIComponents/BannerHeader";
import StyledText from "../UIComponents/StyledText";
import { useFetchAchievements } from "./hooks/achievementHooks";
import { localizeNumber, setRoute } from "../../utility/helpers";
import { useSpeciesCount } from "../../utility/customHooks";
import { baseTextStyles } from "../../styles/textStyles";

const AchievementsScreen = ( ): Node => {
  const state = useFetchAchievements( );
  const speciesCount = useSpeciesCount();
  const navigation = useNavigation( );

  const navToObservations = useCallback( ( ) => {
    setRoute( "Achievements" );
    navigation.navigate( "Observations" );
  }, [navigation] );

  const renderStats = ( disabled, headerText, text ) => (
    <TouchableOpacity
      onPress={navToObservations}
      style={viewStyles.secondHeaderText}
      disabled={disabled}
    >
      <GreenText center smaller text={headerText} />
      <StyledText style={[baseTextStyles.regular, textStyles.number]}>
        {text && localizeNumber( text )}
      </StyledText>
    </TouchableOpacity>
  );

  const renderFooter = ( ) => (
    <View style={viewStyles.center}>
      <View style={viewStyles.row}>
        {renderStats( false, "badges.observed", speciesCount )}
        {renderStats( true, "badges.earned", state.badgesEarned )}
      </View>
      <View style={viewStyles.loginCardMargin} />
      <LoginCard />
    </View>
  );

  return (
    <ScrollWithHeader
      header="badges.achievements"
      loading={state.level === null}
      footer
    >
      <Spacer backgroundColor={colors.greenGradientDark} />
      <LevelHeader
        level={state.level}
        nextLevelCount={state.nextLevelCount}
        speciesCount={speciesCount}
      />
      <BannerHeader text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()} />
      <SpeciesBadges speciesBadges={state.speciesBadges} />
      <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
      <ChallengeBadges />
      {renderFooter( )}
    </ScrollWithHeader>
  );
};

export default AchievementsScreen;
