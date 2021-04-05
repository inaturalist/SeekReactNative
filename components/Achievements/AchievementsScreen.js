// @flow

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Realm from "realm";
import type { Node } from "react";

import i18n from "../../i18n";
import taxonIds from "../../utility/dictionaries/taxonDict";
import realmConfig from "../../models";
import styles from "../../styles/badges/achievements";
import { colors } from "../../styles/global";
import LevelHeader from "./LevelHeader";
import SpeciesBadges from "./SpeciesBadges";
import ChallengeBadges from "./ChallengeBadges";
import GreenText from "../UIComponents/GreenText";
import LoginCard from "../UIComponents/LoginCard";
import Spacer from "../UIComponents/TopSpacer";
import { fetchNumberSpeciesSeen, localizeNumber, setRoute } from "../../utility/helpers";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import BannerHeader from "./BannerHeader";

const AchievementsScreen = (): Node => {
  const navigation = useNavigation();
  const [state, setState] = useState( {
    speciesBadges: [],
    level: null,
    nextLevelCount: 0,
    badgesEarned: null,
    speciesCount: null
  } );

  const fetchBadges = useCallback( async ( ) => {
    try {
      const realm = await Realm.open( realmConfig );
      const badges = realm.objects( "BadgeRealm" );
      const badgesEarned = badges.filtered( "iconicTaxonName != null AND earned == true" ).length;
      const iconicTaxonIds = Object.keys( taxonIds ).map( id => taxonIds[id] );

      const speciesBadges = [];

      iconicTaxonIds.forEach( ( id ) => {
        if ( id === null ) { return; }
        const highestEarned = badges
          .filtered( `iconicTaxonName != null AND iconicTaxonId == ${id} AND earned == true` )
          .sorted( "index", true );
        speciesBadges.push( highestEarned[0] );
      } );

      const allLevels = badges.filtered( "iconicTaxonName == null" ).sorted( "index" );
      const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
      const nextLevel = badges.filtered( "iconicTaxonName == null AND earned == false" ).sorted( "index" );

      fetchNumberSpeciesSeen( ).then( ( species ) => {
        setState( {
          speciesBadges,
          level: levelsEarned.length > 0 ? levelsEarned[0] : allLevels[0],
          nextLevelCount: nextLevel[0] ? nextLevel[0].count : 0,
          badgesEarned,
          speciesCount: species
        } );
      } );
    } catch ( e ) {
      console.log( e, "couldn't open realm: achievements" );
    }
  }, [] );

  useEffect( () => {
    navigation.addListener( "focus", () => { fetchBadges(); } );
  }, [navigation, fetchBadges] );

  const navToObservations = useCallback( () => {
    setRoute( "Achievements" );
    navigation.navigate( "Observations" );
  }, [navigation] );

  if ( state.level === null ) {
    return null;
  }

  return (
    <ScrollWithHeader header="badges.achievements">
      <Spacer backgroundColor={colors.greenGradientDark} />
      {state.level && (
        <LevelHeader
          level={state.level}
          nextLevelCount={state.nextLevelCount}
          speciesCount={state.speciesCount}
        />
      )}
      <View style={styles.center}>
        <BannerHeader text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()} />
        <SpeciesBadges speciesBadges={state.speciesBadges} />
        <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
        <ChallengeBadges />
      </View>
      <View style={[styles.row, styles.center]}>
        <TouchableOpacity
          onPress={navToObservations}
          style={styles.secondHeaderText}
        >
          <GreenText center smaller text="badges.observed" />
          <Text style={styles.number}>{state.speciesCount && localizeNumber( state.speciesCount )}</Text>
        </TouchableOpacity>
        <View style={styles.secondHeaderText}>
          <GreenText center smaller text="badges.earned" />
          <Text style={styles.number}>{state.badgesEarned && localizeNumber( state.badgesEarned )}</Text>
        </View>
      </View>
      <View style={styles.center}>
        <LoginCard />
      </View>
    </ScrollWithHeader>
  );
};

export default AchievementsScreen;
