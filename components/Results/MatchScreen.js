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
import ChallengeEarnedModal from "../AchievementModals/ChallengeEarnedModal";
import FlagModal from "./FlagModal";
import styles from "../../styles/results/results";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";
import Banner from "../Toasts/Toasts";
import Footer from "../Home/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../Padding";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import Spacer from "../iOSSpacer";
import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted, setChallengeProgress } from "../../utility/challengeHelpers";
import { setSpeciesId, setRoute, removeFromCollection } from "../../utility/helpers";
// import { openShareDialog } from "../../utility/shareHelpers";
import {
  createLocationPermissionsAlert,
  createGPSAlert,
  createLocationTimeoutAlert
} from "../../utility/locationHelpers";

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
      match,
      isLoggedIn,
      errorCode
    } = navigation.state.params;

    this.state = {
      badge: null,
      latestLevel: null,
      challenge: null,
      challengeInProgress: null,
      showLevelModal: false,
      showFlagModal: false,
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
      challengeShown: false,
      isLoggedIn,
      errorCode
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
    this.toggleChallengeModal = this.toggleChallengeModal.bind( this );
    this.toggleFlagModal = this.toggleFlagModal.bind( this );
    this.deleteObservation = this.deleteObservation.bind( this );
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

  showFailureScreen() {
    this.setState( {
      seenDate: null,
      match: false,
      commonAncestor: null,
      speciesSeenImage: null
    } );
  }

  toggleFlagModal( showFailure ) {
    const { showFlagModal } = this.state;

    this.setState( { showFlagModal: !showFlagModal } );

    if ( showFailure ) {
      this.showFailureScreen();
    }
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
    const { latitude, longitude, errorCode } = this.state;

    if ( !latitude && !longitude ) {
      if ( errorCode === 1 ) {
        createLocationPermissionsAlert();
      } else if ( errorCode === 2 ) {
        createGPSAlert();
      } else {
        createLocationTimeoutAlert();
      }
    }
  }

  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
  }

  deleteObservation() {
    const { taxaId } = this.state;
    removeFromCollection( taxaId );
  }

  render() {
    const { navigation } = this.props;

    const {
      badge,
      showChallengeModal,
      showLevelModal,
      showFlagModal,
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
      match,
      isLoggedIn
    } = this.state;

    let headerText;
    let gradientColorDark;
    let gradientColorLight;
    let text;
    let speciesText;

    if ( seenDate ) {
      headerText = i18n.t( "results.resighted" ).toLocaleUpperCase();
      gradientColorDark = "#22784d";
      gradientColorLight = colors.seekForestGreen;
      text = i18n.t( "results.date_observed", { seenDate } );
      speciesText = taxaName;
    } else if ( taxaName && match ) {
      headerText = i18n.t( "results.observed_species" ).toLocaleUpperCase();
      gradientColorDark = "#22784d";
      gradientColorLight = colors.seekForestGreen;
      text = ( latitude && longitude ) ? i18n.t( "results.learn_more" ) : i18n.t( "results.learn_more_no_location" );
      speciesText = taxaName;
    } else if ( commonAncestor ) {
      headerText = i18n.t( "results.believe" ).toLocaleUpperCase();
      gradientColorDark = "#175f67";
      gradientColorLight = colors.seekTeal;
      text = i18n.t( "results.common_ancestor" );
      speciesText = commonAncestor;
    } else {
      headerText = i18n.t( "results.no_identification" ).toLocaleUpperCase();
      gradientColorDark = "#404040";
      gradientColorLight = "#5e5e5e";
      text = i18n.t( "results.sorry" );
      speciesText = null;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: gradientColorDark }} />
        <SafeAreaView style={styles.safeView}>
          {match && !seenDate ? (
            <NavigationEvents
              onWillFocus={() => {
                this.scrollToTop();
              }}
              onDidFocus={() => {
                this.checkForChallengesCompleted();
                this.checkForNewBadges();
                this.checkLocationPermissions();
              }}
              onWillBlur={() => setChallengeProgress( "none" )}
            />
          ) : (
            <NavigationEvents
              onWillFocus={() => {
                this.scrollToTop();
              }}
            />
          )}
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
              <ChallengeEarnedModal
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
          {match || seenDate ? (
            <Modal isVisible={showFlagModal}>
              <FlagModal
                toggleFlagModal={this.toggleFlagModal}
                deleteObservation={this.deleteObservation}
                userImage={userImage}
                speciesSeenImage={speciesSeenImage}
                speciesText={speciesText}
                seenDate={seenDate}
              />
            </Modal>
          ) : null}
          <ScrollView
            ref={( ref ) => { this.scrollView = ref; }}
          >
            {Platform.OS === "ios" && <Spacer backgroundColor={gradientColorDark} />}
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
                {speciesSeenImage ? (
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
                  <Text style={[styles.linkText, { marginBottom: 28 }]}>{i18n.t( "results.back" )}</Text>
                </TouchableOpacity>
              ) : null}
              {/* {isLoggedIn ? (
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => openShareDialog( userImage )}
                >
                  <Text style={[styles.linkText, { marginBottom: 28 }]}>Share your Observation</Text>
                </TouchableOpacity>
              ) : null} */}
              {isLoggedIn ? (
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
              ) : null}
            </View>
            <Padding />
          </ScrollView>
          {match || seenDate
            ? <MatchFooter navigation={navigation} toggleFlagModal={this.toggleFlagModal} />
            : <Footer navigation={navigation} />
          }
        </SafeAreaView>
      </View>
    );
  }
}

export default MatchScreen;
