// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";
import Modal from "react-native-modal";

import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import taxonIds from "../../utility/taxonDict";
import realmConfig from "../../models";
import styles from "../../styles/badges/badges";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import LevelHeader from "./LevelHeader";
import BannerHeader from "./BannerHeader";
import SpeciesBadges from "./SpeciesBadges";
import LevelModal from "../AchievementModals/LevelModal";
import ChallengeModal from "../AchievementModals/ChallengeModal";
import ChallengeUnearnedModal from "../AchievementModals/ChallengeUnearnedModal";
import GreenHeader from "../GreenHeader";
import { recalculateBadges } from "../../utility/badgeHelpers";

type Props = {
  navigation: any
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
      showLevelModal: false,
      showChallengeModal: false,
      selectedChallenge: null
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
  }

  setChallenge( challenge ) {
    this.setState( { selectedChallenge: challenge } );
  }

  fetchBadges() {
    recalculateBadges();

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
        const challenges = realm.objects( "ChallengeRealm" ).sorted( [["percentComplete", true], ["availableDate", true]] );
        const challengeBadges = challenges.slice( 0, 3 );
        this.setState( { challengeBadges } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  toggleLevelModal() {
    const { showLevelModal } = this.state;
    this.setState( { showLevelModal: !showLevelModal } );
  }

  toggleChallengeModal() {
    const { showChallengeModal } = this.state;
    this.setState( { showChallengeModal: !showChallengeModal } );
  }

  render() {
    const {
      speciesBadges,
      challengeBadges,
      level,
      nextLevelCount,
      badgesEarned,
      speciesCount,
      showLevelModal,
      showChallengeModal,
      selectedChallenge
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => {
              this.fetchBadges();
              this.fetchChallenges();
              this.fetchSpeciesCount();
            }}
          />
          <Modal
            isVisible={showLevelModal}
            onSwipe={() => this.toggleLevelModal()}
            onBackdropPress={() => this.toggleLevelModal()}
            swipeDirection="down"
          >
            <LevelModal
              speciesCount={speciesCount}
              level={level}
              toggleLevelModal={this.toggleLevelModal}
            />
          </Modal>
          <Modal
            isVisible={showChallengeModal}
            onSwipe={() => this.toggleChallengeModal()}
            onBackdropPress={() => this.toggleChallengeModal()}
            swipeDirection="down"
          >
            {selectedChallenge && selectedChallenge.percentComplete === 100 ? (
              <ChallengeModal
                challenge={selectedChallenge}
                toggleChallengeModal={this.toggleChallengeModal}
              />
            ) : (
              <ChallengeUnearnedModal
                challenge={selectedChallenge}
                toggleChallengeModal={this.toggleChallengeModal}
              />
            )
            }
          </Modal>
          <GreenHeader header={i18n.t( "badges.achievements" )} navigation={navigation} />
          <ScrollView>
            {Platform.OS === "ios" && <View style={styles.iosSpacer} />}
            <LevelHeader
              level={level}
              nextLevelCount={nextLevelCount}
              toggleLevelModal={this.toggleLevelModal}
            />
            <SpeciesBadges speciesBadges={speciesBadges} />
            <View style={styles.secondTextContainer}>
              <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
              <FlatList
                data={challengeBadges}
                contentContainerStyle={styles.badgesContainer}
                keyExtractor={challenge => challenge.name}
                numColumns={3}
                renderItem={( { item } ) => {
                  let badgeIcon;
                  if ( item.percentComplete === 100 ) {
                    badgeIcon = badgeImages[item.earnedIconName];
                  } else {
                    badgeIcon = badgeImages[item.unearnedIconName];
                  }
                  return (
                    <TouchableOpacity
                      style={styles.gridCell}
                      onPress={() => {
                        this.toggleChallengeModal();
                        this.setChallenge( item );
                      }}
                    >
                      <Image
                        source={badgeIcon}
                        style={styles.badgeIcon}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
              <View style={{ marginTop: 42 }} />
              <View style={styles.stats}>
                <View>
                  <Text style={styles.secondHeaderText}>{i18n.t( "badges.observed" ).toLocaleUpperCase()}</Text>
                  <Text style={styles.number}>{speciesCount}</Text>
                </View>
                <View>
                  <Text style={styles.secondHeaderText}>{i18n.t( "badges.earned" ).toLocaleUpperCase()}</Text>
                  <Text style={styles.number}>{badgesEarned}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.darkText}>{i18n.t( "badges.explanation" )}</Text>
              </View>
            </View>
            <Padding />
          </ScrollView>
          {/* <Footer navigation={navigation} /> */}
        </SafeAreaView>
      </View>
    );
  }
}

export default AchievementsScreen;
