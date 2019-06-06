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
import { NavigationEvents } from "react-navigation";

import LevelModal from "../AchievementModals/LevelModal";
import ChallengeModal from "../AchievementModals/ChallengeModal";
import styles from "../../styles/results/results";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";
import Banner from "../Toasts/Toasts";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import {
  recalculateBadges,
  getBadgesEarned
} from "../../utility/badgeHelpers";
import {
  recalculateChallenges,
  getChallengesCompleted,
  getChallengeProgress
} from "../../utility/challengeHelpers";
import { fetchAccessToken } from "../../utility/loginHelpers";
import { setSpeciesId, setRoute } from "../../utility/helpers";
import realmConfig from "../../models/index";

type Props = {
  navigation: any
}

class MatchScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      userImage,
      image,
      taxaName,
      taxaId,
      speciesSeenImage,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    } = navigation.state.params;

    this.state = {
      badgesEarned: 0,
      challengesCompleted: 0,
      badge: null,
      showLevelModal: false,
      showChallengeModal: false,
      newestLevel: null,
      challenge: null,
      incompleteChallenge: null,
      navigationPath: null,
      challengeProgressIndex: null,
      userImage,
      image,
      isLoggedIn: false,
      taxaName,
      taxaId,
      speciesSeenImage,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
  }

  // async componentWillMount() {

  // componentWillUnmount() {
  //   this.resetState();
  // }

  setNavigationPath( navigationPath ) {
    this.setState( { navigationPath }, () => this.checkModals() );
  }

  setChallengeProgressIndex( challengeProgressIndex ) {
    this.setState( { challengeProgressIndex }, () => this.checkForChallengesCompleted() );
  }

  setBadgesEarned( badgesEarned ) {
    this.setState( {
      badgesEarned
    }, () => this.checkForNewBadges() );
  }

  setChallengesCompleted( challengesCompleted ) {
    this.setState( { challengesCompleted } );
  }

  setLatestBadge( badge ) {
    this.setState( { badge } );
  }

  setLatestChallenge( challenge ) {
    this.setState( { challenge } );
  }

  setLatestLevel( newestLevel ) {
    this.setState( { newestLevel } );
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setLoggedIn( isLoggedIn ) {
    this.setState( { isLoggedIn } );
  }

  async checkUserStatus() {
    this.getLoggedIn();
    const badgesEarned = await getBadgesEarned();
    const challengesCompleted = await getChallengesCompleted();
    this.setBadgesEarned( badgesEarned );
    this.setChallengesCompleted( challengesCompleted );
    recalculateChallenges();
    const index = await getChallengeProgress();
    this.setChallengeProgressIndex( index );
  }

  resetState() {
    this.setState( {
      badgesEarned: 0,
      challengesCompleted: 0,
      badge: null,
      showLevelModal: false,
      showChallengeModal: false,
      newestLevel: null,
      challenge: null,
      incompleteChallenge: null,
      navigationPath: null,
      challengeProgressIndex: null
    } );
  }

  showChallengeInProgress( incompleteChallenge ) {
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

        const speciesCount = realm.objects( "ObservationRealm" ).length;
        const newestLevels = realm.objects( "BadgeRealm" )
          .filtered( "earned == true AND iconicTaxonName == null" )
          .sorted( "earnedDate", true );

        if ( badgesEarned < earnedBadges.length ) {
          this.setLatestBadge( badges[0] );
        }

        if ( speciesCount === newestLevels[0].count && speciesCount !== 0 ) {
          this.setLatestLevel( newestLevels[0] );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  checkForChallengesCompleted() {
    const { challengesCompleted, challengeProgressIndex } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" )
          .filtered( "started == true AND percentComplete == 100" )
          .sorted( "completedDate", true );

        if ( challengeProgressIndex && challengeProgressIndex !== "none" ) {
          const incompleteChallenges = realm.objects( "ChallengeRealm" )
            .filtered( `index == ${Number( challengeProgressIndex )} AND percentComplete != 100` );

          this.showChallengeInProgress( incompleteChallenges[0] );
        }

        if ( challenges.length > challengesCompleted ) {
          this.setLatestChallenge( challenges[0] );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  navigateTo() {
    const { navigationPath, taxaId } = this.state;
    const { navigation } = this.props;

    if ( navigationPath === "Camera" ) {
      navigation.navigate( "Camera" );
    } else if ( navigationPath === "Species" ) {
      setSpeciesId( taxaId );
      setRoute( "Camera" );
      navigation.navigate( "Species" );
    } else if ( navigationPath === "Back" ) {
      navigation.goBack();
    }
  }

  checkModals() {
    const { challenge, newestLevel } = this.state;

    if ( !challenge && !newestLevel ) {
      this.navigateTo();
    } else if ( challenge ) {
      this.toggleChallengeModal();
    } else if ( newestLevel ) {
      this.toggleLevelModal();
    }
  }

  render() {
    const { navigation } = this.props;

    const {
      badge,
      showChallengeModal,
      showLevelModal,
      newestLevel,
      challenge,
      incompleteChallenge,
      userImage,
      image,
      isLoggedIn,
      taxaName,
      taxaId,
      speciesSeenImage,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#22784d" }} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => {
              this.checkUserStatus();
            }}
            onWillBlur={() => this.resetState()}
          />
          <Banner navigation={navigation} badge={badge} incompleteChallenge={incompleteChallenge} />
          <Modal
            isVisible={showChallengeModal}
            onSwipeComplete={() => this.toggleChallengeModal()}
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
            onSwipeComplete={() => this.toggleLevelModal()}
            onBackdropPress={() => this.toggleLevelModal()}
            swipeDirection="down"
            onModalHide={() => this.navigateTo()}
          >
            <LevelModal
              level={newestLevel}
              toggleLevelModal={this.toggleLevelModal}
              speciesCount={newestLevel ? newestLevel.count : 0}
            />
          </Modal>
          <ScrollView>
            <LinearGradient
              colors={["#22784d", "#38976d"]}
              style={styles.header}
            >
              <TouchableOpacity
                onPress={() => this.setNavigationPath( "Back" )}
                hitSlop={styles.touchable}
                style={styles.backButton}
              >
                <Image source={icons.backButton} />
              </TouchableOpacity>
              <View style={[styles.imageContainer, styles.buttonContainer]}>
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
              {latitude && longitude
                ? <Text style={styles.text}>{i18n.t( "results.learn_more" )}</Text>
                : <Text style={styles.text}>{i18n.t( "results.learn_more_no_location" )}</Text>
              }
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setNavigationPath( "Species" );
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
                }}
              >
                <Text style={styles.linkText}>{i18n.t( "results.back" )}</Text>
              </TouchableOpacity>
              <View style={{ marginBottom: 28 }} />
              {isLoggedIn && latitude && longitude && !postingSuccess
                ? (
                  <PostToiNat
                    navigation={navigation}
                    color={colors.seekForestGreen}
                    taxaInfo={{
                      taxaName,
                      taxaId,
                      image,
                      userImage,
                      scientificName,
                      latitude,
                      longitude,
                      time
                    }}
                  />
                ) : null
              }
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
