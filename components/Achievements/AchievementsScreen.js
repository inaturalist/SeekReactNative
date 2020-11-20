// @flow

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";

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

const AchievementsScreen = () => {
  const navigation = useNavigation();
  const [speciesCount, setSpeciesCount] = useState( 0 );
  const [loading, setLoading] = useState( true );
  const [state, setState] = useState( {
    speciesBadges: [],
    level: null,
    nextLevelCount: 0,
    badgesEarned: 0
  } );

  const fetchBadges = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" );
        const badgesEarned = badges.filtered( "iconicTaxonName != null AND earned == true" ).length;

        const iconicTaxonIds = Object.keys( taxonIds ).map( id => taxonIds[id] );

        const speciesBadges = [];

        iconicTaxonIds.forEach( ( id ) => {
          const highestEarned = badges.filtered( `iconicTaxonName != null AND iconicTaxonId == ${id}` )
            .sorted( "earnedDate", true );
          speciesBadges.push( highestEarned[0] );
        } );

        const allLevels = badges.filtered( "iconicTaxonName == null" ).sorted( "index" );
        const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
        const nextLevel = badges.filtered( "iconicTaxonName == null AND earned == false" ).sorted( "index" );

        speciesBadges.sort( ( a, b ) => {
          if ( a.index < b.index && a.earned > b.earned ) {
            return -1;
          }
          return 1;
        } );

        setState( {
          speciesBadges,
          level: levelsEarned.length > 0 ? levelsEarned[0] : allLevels[0],
          nextLevelCount: nextLevel[0] ? nextLevel[0].count : 0,
          badgesEarned
        } );
        setLoading( false );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  const fetchSpeciesCount = () => {
    fetchNumberSpeciesSeen().then( ( species ) => {
      setSpeciesCount( species );
    } );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      fetchBadges();
      fetchSpeciesCount();
    } );
  }, [navigation] );

  const navToObservations = useCallback( () => {
    setRoute( "Achievements" );
    navigation.navigate( "Observations" );
  }, [navigation] );

  return (
    <ScrollWithHeader header="badges.achievements" loading={loading}>
      <Spacer backgroundColor={colors.greenGradientDark} />
      {state.level && (
        <LevelHeader
          level={state.level}
          nextLevelCount={state.nextLevelCount}
          speciesCount={speciesCount}
        />
      )}
      <SpeciesBadges speciesBadges={state.speciesBadges} />
      <ChallengeBadges />
      <View style={[styles.row, styles.center]}>
        <TouchableOpacity
          onPress={navToObservations}
          style={styles.secondHeaderText}
        >
          <GreenText center smaller text="badges.observed" />
          <Text style={styles.number}>{localizeNumber( speciesCount )}</Text>
        </TouchableOpacity>
        <View style={styles.secondHeaderText}>
          <GreenText center smaller text="badges.earned" />
          <Text style={styles.number}>{localizeNumber( state.badgesEarned )}</Text>
        </View>
      </View>
      <View style={styles.center}>
        <LoginCard />
      </View>
    </ScrollWithHeader>
  );
};

export default AchievementsScreen;
