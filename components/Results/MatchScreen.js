// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import Realm from "realm";

import LevelModal from "../AchievementModals/LevelModal";
import ChallengeModal from "../AchievementModals/ChallengeModal";
import styles from "../../styles/results/results";
import icons from "../../assets/icons";
import Banner from "../Toasts/Toasts";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import i18n from "../../i18n";
import { createNotification } from "../../utility/notificationHelpers";
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

type Props = {
  speciesSeenImage: string,
  taxaName: string,
  taxaId: number,
  userImage: string,
  navigation: any
}

class MatchScreen extends Component<Props> {
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
      incompleteChallenge: null,
      navigationPath: null
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
  }

  async componentWillMount() {
    const badgesEarned = await getBadgesEarned();
    const challengesCompleted = await getChallengesCompleted();
    const levelsEarned = await getLevelsEarned();
    this.setBadgesEarned( badgesEarned );
    this.setChallengesCompleted( challengesCompleted );
    this.setLevelsEarned( levelsEarned );
  }

  setNavigationPath( navigationPath ) {
    this.setState( { navigationPath } );
  }

  setBadgesEarned( badgesEarned ) {
    this.setState( {
      badgesEarned
    }, () => this.checkForNewBadges() );
  }

  setChallengesCompleted( challengesCompleted ) {
    this.setState( {
      challengesCompleted
    }, () => this.checkForChallengesCompleted() );
  }

  setLevelsEarned( levelsEarned ) {
    this.setState( { levelsEarned } );
  }

  setLatestBadge( badge ) {
    this.setState( { badge } );

    if ( badge.count > 1 ) {
      createNotification( "badgeEarned" );
    }
  }

  setLatestChallenge( challenge ) {
    this.setState( { challenge } );
    createNotification( "challengeCompleted", challenge.index );
  }

  setLatestLevel( newestLevel ) {
    this.setState( { newestLevel } );
  }

  showChallengeInProgress( incompleteChallenge ) {
    this.checkForNewLevels();
    this.setState( { incompleteChallenge } );
  }

  toggleChallengeModal() {
    const { showChallengeModal } = this.state;

    this.setState( { showChallengeModal: !showChallengeModal } );
  }

  toggleLevelModal() {
    const { showLevelModal } = this.state;

    this.setState( { showLevelModal: !showLevelModal } );
  }

  checkForNewBadges() {
    const { badgesEarned } = this.state;

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName != null" );
        const badges = earnedBadges.sorted( "earnedDate", true );

        if ( badgesEarned < earnedBadges.length ) {
          this.setLatestBadge( badges[0] );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  checkForNewLevels() {
    const { levelsEarned } = this.state;

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {

        const earnedLevels = realm.objects( "BadgeRealm" ).filtered( "earned == true AND iconicTaxonName == null" );
        const newestLevels = earnedLevels.sorted( "earnedDate", true );

        if ( levelsEarned < earnedLevels.length ) {
          this.setLatestLevel( newestLevels[0] );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  checkForChallengesCompleted() {
    const { challengesCompleted } = this.state;

    recalculateChallenges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete == 100" );
        const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete != 100" );

        if ( challenges.length > challengesCompleted ) {
          this.setLatestChallenge( challenges[0] );
        } else if ( incompleteChallenges.length > 0 ) {
          this.showChallengeInProgress( incompleteChallenges[0] );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  navigateTo() {
    const { navigationPath } = this.state;
    const { navigation, taxaId, taxaName } = this.props;

    if ( navigationPath === "Camera" ) {
      navigation.navigate( "Camera" );
    } else if ( navigationPath === "Species" ) {
      navigation.push( "Species", {
        id: taxaId,
        commonName: taxaName,
        scientificName: null
      } );
    } else if ( navigationPath === "Back" ) {
      navigation.goBack();
    }
  }


  checkModals() {
    const { challenge, newestLevel } = this.state;

    if ( challenge ) {
      this.toggleChallengeModal();
    } else if ( newestLevel ) {
      this.toggleLevelModal();
    } else {
      this.navigateTo();
    }
  }

  render() {
    const {
      taxaName,
      speciesSeenImage,
      userImage,
      navigation
    } = this.props;

    const {
      badge,
      showChallengeModal,
      showLevelModal,
      newestLevel,
      challenge,
      incompleteChallenge
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#22784d" }} />
        <SafeAreaView style={styles.safeView}>
          <Banner navigation={navigation} badge={badge} incompleteChallenge={incompleteChallenge} />
          <Modal
            isVisible={showChallengeModal}
            onSwipe={() => this.toggleChallengeModal()}
            onBackdropPress={() => this.toggleChallengeModal()}
            swipeDirection="down"
            onModalHide={() => {
              this.setState( { challenge: null } );
              this.checkModals();
            }}
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
            onModalHide={() => this.navigateTo()}
          >
            <LevelModal level={newestLevel} toggleLevelModal={this.toggleLevelModal} />
          </Modal>
          <ScrollView>
            <LinearGradient
              colors={["#22784d", "#38976d"]}
              style={styles.header}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setNavigationPath( "Back" );
                  this.checkModals();
                }}
                style={styles.buttonContainer}
              >
                <Image
                  source={icons.backButton}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.imageCell}
                  source={{ uri: userImage }}
                />
                <Image
                  style={styles.imageCell}
                  source={{ uri: speciesSeenImage }}
                />
              </View>
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>{i18n.t( "results.observed_species" ).toLocaleUpperCase()}</Text>
              <Text style={styles.speciesText}>{taxaName}</Text>
              <Text style={styles.text}>{i18n.t( "results.learn_more" )}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setNavigationPath( "Species" );
                  this.checkModals();
                }}
              >
                <Text
                  style={styles.buttonText}
                >
                  {i18n.t( "results.view_species" ).toLocaleUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => {
                  this.setNavigationPath( "Camera" );
                  this.checkModals();
                }}
              >
                <Text style={styles.linkText}>{i18n.t( "results.back" )}</Text>
              </TouchableOpacity>
            </View>
            <Padding />
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default MatchScreen;
