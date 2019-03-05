// @flow
import React, { Component } from "react";
import { Animated, View, Alert } from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";

import BadgeToast from "./BadgeToast";
import ChallengeToast from "./ChallengeToast";
import styles from "../../styles/banner/badgeToast";
import {
  recalculateBadges,
  getBadgesEarned,
  getLevelsEarned
} from "../../utility/badgeHelpers";
import {
  recalculateChallenges,
  getChallengesCompleted
} from "../../utility/challengeHelpers";
import realmConfig from "../../models/index";
import LevelModal from "../Badges/LevelModal";
import ChallengeModal from "../Badges/ChallengeModal";
import { createNotification } from "../../utility/notificationHelpers";

type Props = {
  navigation: any
}

class Banner extends Component<Props> {
  constructor() {
    super();

    this.state = {
      badgesEarned: 0,
      levelsEarned: 0,
      challengesCompleted: 0,
      badge: null,
      showLevelModal: false,
      showChallengeModal: false,
      newestLevel: null,
      challenge: null,
      incompleteChallenge: null
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
    this.animatedBadge = new Animated.Value( -120 );
    this.animatedChallenge = new Animated.Value( -130 );
  }

  async componentWillMount() {
    const challengesCompleted = await getChallengesCompleted();
    const levelsEarned = await getLevelsEarned();
    const badgesEarned = await getBadgesEarned();
    // Alert.alert( badgesEarned, "badges earned in banner" );
    this.setChallengesCompleted( challengesCompleted );
    this.setLevelsEarned( levelsEarned );
    this.setBadgesEarned( badgesEarned );
    this.checkForChallengesCompleted();
  }

  setChallengesCompleted( challengesCompleted ) {
    this.setState( { challengesCompleted } );
  }

  setLevelsEarned( levelsEarned ) {
    this.setState( { levelsEarned } );
  }

  setBadgesEarned( badgesEarned ) {
    this.setState( { badgesEarned } );
  }

  toggleChallengeModal() {
    const { showChallengeModal } = this.state;

    this.setState( { showChallengeModal: !showChallengeModal } );
  }

  toggleLevelModal() {
    const { showLevelModal } = this.state;

    this.setState( { showLevelModal: !showLevelModal } );
  }

  showToasts() {
    const { badge } = this.state;

    if ( badge ) {
      Animated.sequence( [
        Animated.timing(
          this.animatedBadge, {
            toValue: 0,
            duration: 3000
          }
        ),
        Animated.timing(
          this.animatedBadge, {
            toValue: -120,
            delay: 2000,
            duration: 950
          }
        ),
        Animated.timing(
          this.animatedChallenge, {
            toValue: 0,
            duration: 1000
          }
        ),
        Animated.timing(
          this.animatedChallenge, {
            toValue: -130,
            delay: 2000,
            duration: 2000
          }
        )
      ] ).start();
    } else {
      Animated.sequence( [
        Animated.timing(
          this.animatedChallenge, {
            toValue: 0,
            duration: 1000
          }
        ),
        Animated.timing(
          this.animatedChallenge, {
            toValue: -130,
            delay: 2000,
            duration: 2000
          }
        )
      ] ).start();
    }
  }

  checkForChallengesCompleted() {
    const { challengesCompleted } = this.state;

    recalculateChallenges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete == 100" );
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete != 100" );

        if ( challenges.length > challengesCompleted ) {
          this.setState( {
            challenge: challenges[0]
          }, () => {
            this.toggleChallengeModal();
            createNotification( "challengeCompleted", challenges[0].index );
          } );
        } else if ( incompleteChallenges.length > 0 ) {
          this.setState( {
            incompleteChallenge: incompleteChallenges[0]
          }, () => this.showToasts() );
        } else {
          this.checkForNewBadges();
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
    // check for 100 percent on any challenges, from oldest to newest
  }

  checkForNewBadges() {
    const { badgesEarned, levelsEarned, showLevelModal } = this.state;

    recalculateBadges();
    Alert.alert( "recalc badges" );

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" );
        const badges = earnedBadges.sorted( "earnedDate", true );

        const earnedLevels = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName == null" );
        const newestLevels = earnedLevels.sorted( "earnedDate", true );

        if ( levelsEarned < earnedLevels.length ) {
          this.setState( {
            newestLevel: newestLevels[0]
          }, () => this.toggleLevelModal() );
        }

        if ( badgesEarned < earnedBadges.length ) {
          this.setState( {
            badge: badges[0]
          }, () => {
            if ( !showLevelModal ) {
              this.showToasts();
            }
          } );
          if ( badges[0].count > 1 ) {
            createNotification( "badgeEarned" );
          } else {
            this.showToasts();
          }
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  render() {
    const {
      badge,
      showChallengeModal,
      showLevelModal,
      newestLevel,
      challenge,
      incompleteChallenge
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.topContainer}>
        <Modal
          isVisible={showChallengeModal}
          onSwipe={() => this.toggleChallengeModal()}
          onBackdropPress={() => this.toggleChallengeModal()}
          swipeDirection="down"
          onModalHide={() => this.checkForNewBadges()}
        >
          <ChallengeModal
            challenge={challenge}
            toggleChallengeModal={this.toggleChallengeModal}
          />
        </Modal>
        <Modal
          isVisible={showLevelModal}
          onSwipe={() => this.toggleLevelModal()}
          onBackdropPress={() => this.toggleLevelModal()}
          swipeDirection="down"
          onModalHide={() => this.showToasts()}
        >
          <LevelModal level={newestLevel} toggleLevelModal={this.toggleLevelModal} />
        </Modal>
        {badge ? (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedBadge }]
            }
          ]}
          >
            <BadgeToast
              navigation={navigation}
              badge={badge}
            />
          </Animated.View>
        ) : null}
        {incompleteChallenge ? (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedChallenge }]
            }
          ]}
          >
            <ChallengeToast
              navigation={navigation}
              challenge={incompleteChallenge}
            />
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default Banner;
