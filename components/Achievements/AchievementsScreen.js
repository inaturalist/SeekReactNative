// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";

import i18n from "../../i18n";
import taxonIds from "../../utility/taxonDict";
import realmConfig from "../../models";
import styles from "../../styles/badges/badges";
import Padding from "../UIComponents/Padding";
import LevelHeader from "./LevelHeader";
import SpeciesBadges from "./SpeciesBadges";
import ChallengeBadges from "./ChallengeBadges";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenText from "../UIComponents/GreenText";
import LoginCard from "../UIComponents/LoginCard";
import SafeAreaView from "../UIComponents/SafeAreaView";
import Spacer from "../UIComponents/iOSSpacer";
import { fetchNumberSpeciesSeen } from "../../utility/helpers";

type Props = {
  +navigation: any
}

class AchievementsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      speciesBadges: [],
      challengeBadges: [],
      level: null,
      nextLevelCount: null,
      badgesEarned: null,
      speciesCount: null
    };
  }

  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
  }

  fetchBadges() {
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

        this.setState( {
          speciesBadges,
          level: levelsEarned.length > 0 ? levelsEarned[0] : allLevels[0],
          nextLevelCount: nextLevel[0] ? nextLevel[0].count : 0,
          badgesEarned
        } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchSpeciesCount() {
    fetchNumberSpeciesSeen().then( ( speciesCount ) => {
      this.setState( { speciesCount } );
    } );
  }

  fetchChallenges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challengeBadges = [];
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", false );

        challenges.forEach( ( challenge ) => {
          challengeBadges.push( challenge );
        } );

        this.setState( { challengeBadges } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const {
      speciesBadges,
      challengeBadges,
      level,
      nextLevelCount,
      badgesEarned,
      speciesCount
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <NavigationEvents
          onWillBlur={() => this.scrollToTop()}
          onWillFocus={() => {
            this.fetchBadges();
            this.fetchChallenges();
            this.fetchSpeciesCount();
          }}
        />
        <GreenHeader header={i18n.t( "badges.achievements" )} navigation={navigation} />
        <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
          {Platform.OS === "ios" && <Spacer backgroundColor="#22784d" />}
          <LevelHeader
            level={level}
            nextLevelCount={nextLevelCount}
            speciesCount={speciesCount}
          />
          <SpeciesBadges speciesBadges={speciesBadges} />
          <ChallengeBadges challengeBadges={challengeBadges} navigation={navigation} />
          <View style={[styles.row, styles.center]}>
            <TouchableOpacity
              onPress={() => navigation.navigate( "MyObservations" )}
              style={styles.secondHeaderText}
            >
              <GreenText center smaller text="badges.observed" />
              <Text style={styles.number}>{speciesCount}</Text>
            </TouchableOpacity>
            <View style={styles.secondHeaderText}>
              <GreenText center smaller text="badges.earned" />
              <Text style={styles.number}>{badgesEarned}</Text>
            </View>
          </View>
          <View style={styles.center}>
            <LoginCard navigation={navigation} screen="achievements" />
          </View>
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default AchievementsScreen;
