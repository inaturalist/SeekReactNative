// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform
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
import { checkForChallengesCompleted, setChallengeProgress } from "../../utility/challengeHelpers";
import { setSpeciesId, setRoute } from "../../utility/helpers";
import { createLocationPermissionsAlert } from "../../utility/locationHelpers";

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
      seenDate,
      commonAncestor,
      match
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
      taxaName,
      taxaId,
      speciesSeenImage,
      scientificName,
      latitude,
      longitude,
      time,
      seenDate,
      commonAncestor,
      match,
      challengeShown: false
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

  setChallengeCompleteShown( challengeShown ) {
    this.setState( { challengeShown }, () => this.checkModals() );
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
    }
  }

  checkModals() {
    const { challenge, latestLevel, challengeShown } = this.state;

    if ( ( !challenge && !latestLevel ) || challengeShown ) {
      this.navigateTo();
    } else if ( challenge ) {
      this.toggleChallengeModal();
    } else if ( latestLevel ) {
      this.toggleLevelModal();
    }
  }

  checkLocationPermissions() {
    const { latitude, longitude } = this.state;

    if ( !latitude && !longitude ) {
      createLocationPermissionsAlert();
    }
  }

  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
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
      taxaName,
      taxaId,
      speciesSeenImage,
      scientificName,
      latitude,
      longitude,
      time,
      seenDate,
      commonAncestor,
      match
    } = this.state;

    let headerText;
    let gradientColorDark;
    let gradientColorLight;
    let text;
    let numOfImages;
    let speciesText;

    if ( seenDate ) {
      headerText = i18n.t( "results.resighted" ).toLocaleUpperCase();
      gradientColorDark = "#22784d";
      gradientColorLight = colors.seekForestGreen;
      numOfImages = 2;
      text = i18n.t( "results.date_observed", { seenDate } );
      speciesText = taxaName;
    } else if ( taxaName && match ) {
      headerText = i18n.t( "results.observed_species" ).toLocaleUpperCase();
      gradientColorDark = "#22784d";
      gradientColorLight = colors.seekForestGreen;
      numOfImages = 2;
      text = ( latitude && longitude ) ? i18n.t( "results.learn_more" ) : i18n.t( "results.learn_more_no_location" );
      speciesText = taxaName;
    } else if ( commonAncestor ) {
      headerText = i18n.t( "results.believe" ).toLocaleUpperCase();
      gradientColorDark = "#175f67";
      gradientColorLight = colors.seekTeal;
      numOfImages = 2;
      text = i18n.t( "results.common_ancestor" );
      speciesText = commonAncestor;
    } else {
      headerText = i18n.t( "results.no_identification" ).toLocaleUpperCase();
      gradientColorDark = "#404040";
      gradientColorLight = "#5e5e5e";
      numOfImages = 1;
      text = i18n.t( "results.sorry" );
      speciesText = null;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: gradientColorDark }} />
        <SafeAreaView style={styles.safeView}>
          {match && !seenDate ? (
            <NavigationEvents
              onWillFocus={() => this.scrollToTop()}
              onDidFocus={() => {
                this.checkForChallengesCompleted();
                this.checkForNewBadges();
                this.checkLocationPermissions();
              }}
              onWillBlur={() => setChallengeProgress( "none" )}
            />
          ) : null}
          {match && !seenDate && latitude ? (
            <Banner
              navigation={navigation}
              badge={badge}
              incompleteChallenge={challengeInProgress}
            />
          ) : null}
          {match && !seenDate && latitude ? (
            <Modal
              isVisible={showChallengeModal}
              onSwipeComplete={() => this.toggleChallengeModal()}
              onBackdropPress={() => this.toggleChallengeModal()}
              swipeDirection="down"
              onModalHide={() => this.setChallengeCompleteShown( true )}
            >
              <ChallengeModal
                challenge={challenge}
                toggleChallengeModal={this.toggleChallengeModal}
              />
            </Modal>
          ) : null}
          {match && !seenDate && latitude ? (
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
          ) : null}
          <ScrollView
            ref={( ref ) => { this.scrollView = ref; }}
          >
            <LinearGradient
              colors={[gradientColorDark, gradientColorLight]}
              style={styles.header}
            >
              <TouchableOpacity
                onPress={() => this.setNavigationPath( "Camera" )}
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
                {numOfImages === 2 ? (
                  <Image
                    style={styles.imageCell}
                    source={{ uri: speciesSeenImage }}
                  />
                ) : null}
              </View>
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={[styles.headerText, { color: gradientColorLight }]}>{headerText}</Text>
              {seenDate || match || commonAncestor
                ? <Text style={styles.speciesText}>{speciesText}</Text>
                : null}
              <Text style={styles.text}>{text}</Text>
              {seenDate || match ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: gradientColorLight }]}
                  onPress={() => {
                    setSpeciesId( taxaId ); // not sure why these are here
                    setRoute( "Camera" ); // not sure why these are here
                    this.setNavigationPath( "Species" );
                  }}
                >
                  <Text style={styles.buttonText}>
                    {i18n.t( "results.view_species" ).toLocaleUpperCase()}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: gradientColorLight }]}
                  onPress={() => navigation.navigate( "Camera" )}
                >
                  <Text style={styles.buttonText}>
                    {i18n.t( "results.take_photo" ).toLocaleUpperCase()}
                  </Text>
                </TouchableOpacity>
              )}
              {seenDate || match ? (
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => this.setNavigationPath( "Camera" )}
                >
                  <Text style={styles.linkText}>{i18n.t( "results.back" )}</Text>
                </TouchableOpacity>
              ) : null}
              <View style={{ marginBottom: 28 }} />
              {latitude && longitude
                ? (
                  <PostToiNat
                    navigation={navigation}
                    color={gradientColorLight}
                    taxaInfo={{
                      taxaName,
                      taxaId,
                      image,
                      userImage,
                      scientificName,
                      latitude,
                      longitude,
                      time,
                      commonAncestor
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
