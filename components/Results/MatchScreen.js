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
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import Spacer from "../UIComponents/iOSSpacer";
import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted, setChallengeProgress } from "../../utility/challengeHelpers";
import {
  setSpeciesId,
  setRoute,
  removeFromCollection,
  fetchNumberSpeciesSeen,
  showAppStoreReview,
  showPlayStoreReview
} from "../../utility/helpers";
import {
  createLocationPermissionsAlert,
  createGPSAlert,
  createLocationTimeoutAlert
} from "../../utility/locationHelpers";
import SpeciesNearby from "./SpeciesNearby";
import GreenButton from "../UIComponents/GreenButton";

type Props = {
  +navigation: any
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
      errorCode,
      rank
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
      errorCode,
      rank
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

    if ( showLevelModal === true ) {
      fetchNumberSpeciesSeen().then( ( speciesCount ) => {
        if ( speciesCount === 30 || speciesCount === 75 ) {
          // trigger review at 30 and 75 species
          if ( Platform.OS === "ios" ) {
            showAppStoreReview();
          } else {
            showPlayStoreReview();
          }
        }
      } );
    }

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
      // return user to match screen
      setRoute( "Match" );
      navigation.navigate( "Species", { ...navigation.state.params } );
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
      isLoggedIn,
      rank
    } = this.state;

    let headerText;
    let gradientColorDark;
    let gradientColorLight;
    let text;
    let speciesText;
    let ancestorRank;

    if ( rank === 20 ) {
      ancestorRank = i18n.t( "camera.genus" );
    } else if ( rank === 30 ) {
      ancestorRank = i18n.t( "camera.family" );
    } else if ( rank === 40 ) {
      ancestorRank = i18n.t( "camera.order" );
    } else if ( rank === 50 ) {
      ancestorRank = i18n.t( "camera.class" );
    } else if ( rank === 60 ) {
      ancestorRank = i18n.t( "camera.phylum" );
    } else if ( rank === 70 ) {
      ancestorRank = i18n.t( "camera.kingdom" );
    }

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
      if ( rank === 20 || rank === 30 || rank === 40 || rank === 50 ) {
        headerText = i18n.t( "results.believe", { ancestorRank } ).toLocaleUpperCase();
      } else {
        headerText = i18n.t( "results.believe_1" ).toLocaleUpperCase();
      }
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
        {match && !seenDate ? (
          <NavigationEvents
            onDidFocus={() => {
              this.checkForChallengesCompleted();
              this.checkForNewBadges();
              this.checkLocationPermissions();
            }}
            onWillBlur={() => {
              setChallengeProgress( "none" );
            }}
            onWillFocus={() => {
              this.scrollToTop();
            }}
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
            badge={badge}
            incompleteChallenge={challengeInProgress}
            navigation={navigation}
          />
        ) : null}
        {match && !seenDate && latitude ? (
          <Modal
            isVisible={showChallengeModal}
            onBackdropPress={() => this.toggleChallengeModal()}
            onModalHide={() => this.setChallengeCompleteShown( true )}
            onSwipeComplete={() => this.toggleChallengeModal()}
            swipeDirection="down"
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
            onBackdropPress={() => this.toggleLevelModal()}
            onModalHide={() => this.navigateTo()}
            onSwipeComplete={() => this.toggleLevelModal()}
            swipeDirection="down"
          >
            <LevelModal
              level={latestLevel}
              speciesCount={latestLevel ? latestLevel.count : 0}
              toggleLevelModal={this.toggleLevelModal}
            />
          </Modal>
        ) : null}
        {match || seenDate ? (
          <Modal isVisible={showFlagModal}>
            <FlagModal
              deleteObservation={this.deleteObservation}
              seenDate={seenDate}
              speciesSeenImage={speciesSeenImage}
              speciesText={speciesText}
              toggleFlagModal={this.toggleFlagModal}
              userImage={userImage}
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
              accessibilityLabel={i18n.t( "accessibility.back" )}
              accessible
              hitSlop={styles.touchable}
              onPress={() => this.setNavigationPath( "Camera" )}
              style={styles.backButton}
            >
              <Image source={icons.backButton} />
            </TouchableOpacity>
            <View style={[styles.imageContainer, styles.buttonContainer]}>
              <Image
                source={{ uri: userImage }}
                style={styles.imageCell}
              />
              {speciesSeenImage ? (
                <Image
                  source={{ uri: speciesSeenImage }}
                  style={styles.imageCell}
                />
              ) : null}
            </View>
          </LinearGradient>
          <View style={styles.marginLarge} />
          <View style={styles.textContainer}>
            <Text style={[styles.headerText, { color: gradientColorLight }]}>{headerText}</Text>
            {seenDate || match || commonAncestor
              ? <Text style={styles.speciesText}>{speciesText}</Text>
              : null}
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.marginMedium} />
          <View style={styles.textContainer}>
            {seenDate || match ? (
              <GreenButton
                color={gradientColorLight}
                handlePress={() => this.setNavigationPath( "Species" )}
                text={i18n.t( "results.view_species" )}
              />
            ) : (
              <GreenButton
                color={gradientColorLight}
                handlePress={() => navigation.navigate( "Camera" )}
                text={i18n.t( "results.take_photo" )}
              />
            )}
          </View>
          <View style={styles.marginMedium} />
          {commonAncestor && rank !== ( 60 || 70 ) ? (
            <SpeciesNearby
              ancestorId={taxaId}
              lat={latitude}
              lng={longitude}
              navigation={navigation}
              params={navigation.state.params}
            />
          ) : null}
          {commonAncestor && rank !== ( 60 || 70 ) ? <View style={styles.marginMedium} /> : null}
          <View style={styles.textContainer}>
            {seenDate || match ? (
              <TouchableOpacity
                onPress={() => this.setNavigationPath( "Camera" )}
                style={styles.link}
              >
                <Text style={[styles.linkText, styles.marginMedium]}>{i18n.t( "results.back" )}</Text>
              </TouchableOpacity>
            ) : null}
            {isLoggedIn ? (
              <PostToiNat
                color={gradientColorLight}
                navigation={navigation}
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
          : <Footer navigation={navigation} />}
      </View>
    );
  }
}

export default MatchScreen;
