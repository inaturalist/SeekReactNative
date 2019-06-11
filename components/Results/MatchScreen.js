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
import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted } from "../../utility/challengeHelpers";
import { setSpeciesId, setRoute } from "../../utility/helpers";

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
      postingSuccess,
      isLoggedIn
    } = navigation.state.params;

    this.state = {
      badge: null,
      latestLevel: null,
      challenge: null,
      challengeInProgress: null,
      showLevelModal: false,
      showChallengeModal: false,
      navigationPath: null,
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
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
  }

  setNavigationPath( navigationPath ) {
    this.setState( { navigationPath }, () => this.checkModals() );
  }

  setLatestBadge( badge ) {
    this.setState( { badge } );
  }

  setLatestChallenge( challenge ) {
    this.setState( { challenge } );
  }

  setLatestLevel( latestLevel ) {
    this.setState( { latestLevel } );
  }

  setChallengeInProgress( challengeInProgress ) {
    this.setState( { challengeInProgress } );
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
    checkForNewBadges().then( ( { latestBadge, latestLevel } ) => {
      if ( latestBadge ) {
        this.setLatestBadge( latestBadge );
      }

      if ( latestLevel ) {
        this.setLatestLevel( latestLevel );
      }
    } ).catch( () => console.log( "could not check for badges" ) );
  }

  checkForChallengesCompleted() {
    checkForChallengesCompleted().then( ( { challengeInProgress, challengeComplete } ) => {
      if ( challengeInProgress ) {
        this.setChallengeInProgress( challengeInProgress );
      }

      if ( challengeComplete ) {
        this.setLatestChallenge( challengeComplete );
      }
    } ).catch( () => console.log( "could not check for challenges" ) );
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
    const { challenge, latestLevel } = this.state;

    if ( !challenge && !latestLevel ) {
      this.navigateTo();
    } else if ( challenge ) {
      this.toggleChallengeModal();
    } else if ( latestLevel ) {
      this.toggleLevelModal();
    }
  }

  render() {
    const { navigation } = this.props;

    const {
      badge,
      showChallengeModal,
      showLevelModal,
      latestLevel,
      challenge,
      challengeInProgress,
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
              this.checkForChallengesCompleted();
              this.checkForNewBadges();
            }}
          />
          <Banner navigation={navigation} badge={badge} incompleteChallenge={challengeInProgress} />
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
              level={latestLevel}
              toggleLevelModal={this.toggleLevelModal}
              speciesCount={latestLevel ? latestLevel.count : 0}
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
                <Text style={styles.buttonText}>
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
