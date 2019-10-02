// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";
import Modal from "react-native-modal";

import i18n from "../../i18n";
import taxonIds from "../../utility/taxonDict";
import realmConfig from "../../models";
import styles from "../../styles/badges/badges";
import Padding from "../UIComponents/Padding";
import LevelHeader from "./LevelHeader";
import SpeciesBadges from "./SpeciesBadges";
import ChallengeBadges from "./ChallengeBadges";
import LevelModal from "../AchievementModals/LevelModal";
import GreenHeader from "../UIComponents/GreenHeader";
import LoginCard from "../UIComponents/LoginCard";
import { checkIfChallengeAvailable } from "../../utility/dateHelpers";
import Spacer from "../UIComponents/iOSSpacer";

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
      speciesCount: null,
      showLevelModal: false
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
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

        const taxaIds = Object.keys( taxonIds ).map( id => taxonIds[id] );

        const speciesBadges = [];

        taxaIds.forEach( ( id ) => {
          const tempBadges = badges.filtered( `iconicTaxonName != null AND iconicTaxonId == ${id}` );
          const sorted = tempBadges.sorted( "earnedDate", true );
          speciesBadges.push( sorted[0] );
        } );

        const allLevels = badges.filtered( "iconicTaxonName == null" ).sorted( "index" );
        const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
        const nextLevel = badges.filtered( "iconicTaxonName == null AND earned == false" ).sorted( "index" );

        speciesBadges.sort( ( a, b ) => {
          if ( a.index < b.index ) {
            return -1;
          }
          return 1;
        } );

        speciesBadges.sort( ( a, b ) => {
          if ( a.earned > b.earned ) {
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
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const speciesCount = realm.objects( "ObservationRealm" ).length;
        this.setState( { speciesCount } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
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

        if ( challenges.length < 8 ) {
          const oct = {
            month: "challenges.october_2019",
            availableDate: new Date( 2019, 9, 1 ),
            startedDate: false,
            percentComplete: 0,
            unearnedIconName: "badge_empty"
          };

          const nov = {
            month: "challenges.november_2019",
            availableDate: new Date( 2019, 10, 1 ),
            startedDate: false,
            percentComplete: 0,
            unearnedIconName: "badge_empty"
          };

          const dec = {
            month: "challenges.december_2019",
            availableDate: new Date( 2019, 11, 1 ),
            startedDate: false,
            percentComplete: 0,
            unearnedIconName: "badge_empty"
          };

          if ( checkIfChallengeAvailable( nov.availableDate ) ) {
            challengeBadges.push( dec );
          } else if ( checkIfChallengeAvailable( oct.availableDate ) ) {
            challengeBadges.push( nov, dec );
          } else {
            challengeBadges.push( oct, nov, dec );
          }
        }

        this.setState( { challengeBadges } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  toggleLevelModal() {
    const { showLevelModal } = this.state;
    this.setState( { showLevelModal: !showLevelModal } );
  }

  render() {
    const {
      speciesBadges,
      challengeBadges,
      level,
      nextLevelCount,
      badgesEarned,
      speciesCount,
      showLevelModal
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <NavigationEvents
          onWillFocus={() => {
            this.scrollToTop();
            this.fetchBadges();
            this.fetchChallenges();
            this.fetchSpeciesCount();
          }}
        />
        <Modal
          isVisible={showLevelModal}
          onBackdropPress={() => this.toggleLevelModal()}
          onSwipeComplete={() => this.toggleLevelModal()}
          swipeDirection="down"
        >
          <LevelModal
            level={level}
            screen="achievements"
            speciesCount={speciesCount}
            toggleLevelModal={this.toggleLevelModal}
          />
        </Modal>
        <GreenHeader header={i18n.t( "badges.achievements" )} navigation={navigation} />
        <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
          {Platform.OS === "ios" && <Spacer backgroundColor="#22784d" />}
          <LevelHeader
            level={level}
            nextLevelCount={nextLevelCount}
            toggleLevelModal={this.toggleLevelModal}
          />
          <SpeciesBadges speciesBadges={speciesBadges} />
          <ChallengeBadges challengeBadges={challengeBadges} navigation={navigation} />
          <View style={styles.secondTextContainer}>
            <View style={styles.stats}>
              <TouchableOpacity
                onPress={() => navigation.navigate( "MyObservations" )}
              >
                <Text style={styles.secondHeaderText}>{i18n.t( "badges.observed" ).toLocaleUpperCase()}</Text>
                <Text style={styles.number}>{speciesCount}</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.secondHeaderText}>{i18n.t( "badges.earned" ).toLocaleUpperCase()}</Text>
                <Text style={styles.number}>{badgesEarned}</Text>
              </View>
            </View>
            <LoginCard navigation={navigation} screen="achievements" />
          </View>
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default AchievementsScreen;
