// @flow
import React, { Component } from "react";
import { Animated, View } from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";

import BadgeToast from "./BadgeToast";
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
      challenge: null
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
    this.animatedValue = new Animated.Value( -120 );
  }

  async componentWillMount() {
    const challengesCompleted = await getChallengesCompleted();
    const levelsEarned = await getLevelsEarned();
    const badgesEarned = await getBadgesEarned();
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

  showToast() {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 950
      }
    ).start( this.hideToast() );
  }

  hideToast() {
    setTimeout( () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: -120,
          duration: 350
        }
      ).start();
    }, 2000 );
  }

  checkForChallengesCompleted() {
    const { challengesCompleted } = this.state;

    recalculateChallenges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete == 100" );

        if ( challenges > challengesCompleted ) {
          this.setState( {
            challenge: challenges[0]
          }, () => {
            this.toggleChallengeModal();
            createNotification( "challengeCompleted", challenges[0].index );
          } );
        } else {
          this.checkForNewBadges();
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
    // check for 100 percent on any challenges, from oldest to newest
  }

  checkForNewBadges() {
    const { badgesEarned, levelsEarned } = this.state;

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" );
        const badges = earnedBadges.sorted( "earnedDate", true );

        const earnedLevels = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName == null" );
        const newestLevels = earnedLevels.sorted( "earnedDate", true );

        if ( badgesEarned < earnedBadges.length ) {
          this.setState( {
            badge: badges[0]
          }, () => {
            this.showToast();
            if ( badges[0].count > 1 ) {
              createNotification( "badgeEarned" );
            }
          } );
        }

        if ( levelsEarned < earnedLevels.length ) {
          this.setState( {
            newestLevel: newestLevels[0]
          }, () => this.toggleLevelModal() );
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
      challenge
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
        >
          <LevelModal level={newestLevel} toggleLevelModal={this.toggleLevelModal} />
        </Modal>
        {badge ? (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedValue }]
            }
          ]}
          >
            <BadgeToast
              navigation={navigation}
              badge={badge}
            />
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default Banner;
