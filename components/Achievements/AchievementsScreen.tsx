import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";

import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import { baseTextStyles } from "../../styles/textStyles";
import { useSpeciesCount } from "../../utility/customHooks";
import { localizeNumber, setRoute, StoredRoutes } from "../../utility/helpers";
import BannerHeader from "../UIComponents/BannerHeader";
import GreenText from "../UIComponents/GreenText";
import LoginCard from "../UIComponents/Login/LoginCard";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../UIComponents/StyledText";
import Spacer from "../UIComponents/TopSpacer";
import ChallengeBadges from "./ChallengeBadges";
import { useFetchAchievements } from "./hooks/achievementHooks";
import LevelHeader from "./LevelHeader";
import SpeciesBadges from "./SpeciesBadges";

const AchievementsScreen = ( ) => {
  const state = useFetchAchievements( );
  const speciesCount = useSpeciesCount();
  const navigation = useNavigation( );

  const navToObservations = useCallback( ( ) => {
    setRoute( StoredRoutes.Achievements );
    navigation.navigate( "Observations" );
  }, [navigation] );

  const renderStats = ( disabled: boolean, headerText: string, text: number ) => (
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
