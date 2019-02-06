// @flow
import React, { Component } from "react";
import { Animated, View } from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";

import BadgeToast from "./BadgeToast";
import styles from "../../styles/banner/badgeToast";
import { recalculateBadges, getBadgesEarned, getLevelsEarned } from "../../utility/badgeHelpers";
import realmConfig from "../../models/index";
import LevelModal from "../Badges/LevelModal";

type Props = {
  navigation: any
}

class Banner extends Component<Props> {
  constructor() {
    super();

    this.state = {
      badgesEarned: 0,
      levelsEarned: 0,
      badge: null,
      showLevelModal: false,
      newestLevel: null
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.animatedValue = new Animated.Value( -120 );
  }

  async componentWillMount() {
    const badgesEarned = await getBadgesEarned();
    const levelsEarned = await getLevelsEarned();
    this.setBadgesEarned( badgesEarned );
    this.setLevelsEarned( levelsEarned );
    this.checkForNewBadges();
  }

  setBadgesEarned( badgesEarned ) {
    this.setState( { badgesEarned } );
  }

  setLevelsEarned( levelsEarned ) {
    this.setState( { levelsEarned } );
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

  checkForNewBadges() {
    const { badgesEarned, levelsEarned } = this.state;

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" );
        const badges = earnedBadges.sorted( "earnedDate", true );

        const earnedLevels = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName == null" );
        const newestLevels = earnedLevels.sorted( "earnedDate", true );
        console.log( newestLevels[0], "newest level" );

        if ( badgesEarned < earnedBadges.length ) {
          this.setState( {
            badge: badges[0]
          }, () => this.showToast() );
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
    const { badge, showLevelModal, newestLevel } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.topContainer}>
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
