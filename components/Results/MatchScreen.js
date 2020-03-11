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

import LevelModal from "../Modals/LevelModal";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import FlagModal from "../Modals/FlagModal";
import styles from "../../styles/results/match";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";
import Toasts from "../Toasts/Toasts";
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
  fetchNumberSpeciesSeen,
  getRoute
} from "../../utility/helpers";
import { removeFromCollection } from "../../utility/observationHelpers";
import {
  showAppStoreReview,
  showPlayStoreReview
} from "../../utility/reviewHelpers";
import {
  createLocationPermissionsAlert,
  createGPSAlert,
  createLocationTimeoutAlert
} from "../../utility/locationHelpers";
import SpeciesNearby from "./SpeciesNearby";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { setAncestorRankText } from "../../utility/textHelpers";
import UserContext from "../UserContext";

type Props = {
  +navigation: any
}

type State = {
  badge: ?Object,
  latestLevel: ?Object,
  challenge: ?Object,
  challengeInProgress: ?Object,
  showChallengeModal: boolean,
  showLevelModal: boolean,
  showFlagModal: boolean,
  navigationPath: ?string,
  userImage: string,
  uri: string,
  taxaName: string,
  taxaId: number,
  speciesSeenImage: ?string,
  scientificName: string,
  latitude: number,
  longitude: number,
  time: number,
  seenDate: ?string,
  commonAncestor: ?string,
  match: boolean,
  challengeShown: boolean,
  errorCode: number,
  rank: number,
  route: ?string
};

class MatchScreen extends Component<Props, State> {
  scrollView: ?any

  constructor( { navigation }: Props ) {
    super();

    const {
      userImage,
      uri,
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
      errorCode,
      rank
    } = navigation.state.params;

    this.state = {
      badge: null,
      latestLevel: null,
      challenge: null,
      challengeInProgress: null,
      showChallengeModal: false,
      showLevelModal: false,
      showFlagModal: false,
      navigationPath: null,
      userImage,
      uri,
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
      errorCode,
      rank,
      route: null
    };

    ( this:any ).closeLevelModal = this.closeLevelModal.bind( this );
    ( this:any ).closeChallengeModal = this.closeChallengeModal.bind( this );
    ( this:any ).closeFlagModal = this.closeFlagModal.bind( this );
    ( this:any ).openFlagModal = this.openFlagModal.bind( this );
    ( this:any ).deleteObservation = this.deleteObservation.bind( this );
  }

  async getRoute() {
    const route = await getRoute();
    this.setState( { route } );
  }

  setNavigationPath( navigationPath: string ) {
    this.setState( { navigationPath }, () => this.checkModals() );
  }

  setLatestBadge( badge: Object ) {
    this.setState( { badge } );
  }

  setLatestChallenge( challenge: Object ) {
    this.setState( { challenge } );
  }

  setChallengeCompleteShown( challengeShown: boolean ) {
    this.setState( { challengeShown }, () => this.checkModals() );
  }

  setLatestLevel( latestLevel: Object ) {
    this.setState( { latestLevel } );
  }

  setChallengeInProgress( challengeInProgress: Object ) {
    this.setState( { challengeInProgress } );
  }

  openChallengeModal() {
    this.setState( { showChallengeModal: true } );
  }

  closeChallengeModal() {
    this.setState( { showChallengeModal: false } );
  }

  openLevelModal() {
    this.setState( { showLevelModal: true }, () => {
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
    } );
  }

  closeLevelModal() {
    this.setState( { showLevelModal: false } );
  }

  showFailureScreen() {
    this.setState( {
      seenDate: null,
      match: false,
      commonAncestor: null,
      speciesSeenImage: null
    } );
  }

  openFlagModal() {
    this.setState( { showFlagModal: true } );
  }

  closeFlagModal( showFailure: boolean ) {
    this.setState( { showFlagModal: false }, () => {
      if ( showFailure ) {
        this.showFailureScreen();
      }
    } );
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
    const {
      challenge,
      latestLevel,
      challengeShown,
      route
    } = this.state;

    if ( ( !challenge && !latestLevel ) || challengeShown || route === "Match" ) {
      this.navigateTo();
    } else if ( challenge ) {
      this.openChallengeModal();
    } else if ( latestLevel ) {
      this.openLevelModal();
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
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
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
      uri,
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
      rank,
      route
    } = this.state;

    let headerText;
    let gradientColorDark;
    let gradientColorLight;
    let text;
    let speciesText;

    const ancestorRank = setAncestorRankText( rank );

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
        <SafeAreaView style={[styles.flex, { backgroundColor: gradientColorDark }]} />
        <NavigationEvents
          onDidFocus={() => {
            if ( match && !seenDate ) {
              this.checkForChallengesCompleted();
              this.checkForNewBadges();
              this.checkLocationPermissions();
            }
          }}
          onWillBlur={() => {
            if ( match && !seenDate ) {
              setChallengeProgress( "none" );
            }
          }}
          onWillFocus={() => {
            this.scrollToTop();
            this.getRoute();
          }}
        />
        {match && !seenDate && latitude && route !== "Match" && route !== "PostStatus" ? (
          <Toasts
            badge={badge}
            incompleteChallenge={challengeInProgress}
          />
        ) : null}
        {match && !seenDate && latitude ? (
          <Modal
            isVisible={showChallengeModal}
            onBackdropPress={() => this.closeChallengeModal()}
            onModalHide={() => this.setChallengeCompleteShown( true )}
            onSwipeComplete={() => this.closeChallengeModal()}
            swipeDirection="down"
          >
            <ChallengeEarnedModal
              challenge={challenge}
              closeModal={this.closeChallengeModal}
            />
          </Modal>
        ) : null}
        {match && !seenDate && latitude ? (
          <Modal
            isVisible={showLevelModal}
            onBackdropPress={() => this.closeLevelModal()}
            onModalHide={() => this.navigateTo()}
            onSwipeComplete={() => this.closeLevelModal()}
            swipeDirection="down"
          >
            <LevelModal
              level={latestLevel}
              speciesCount={latestLevel ? latestLevel.count : 0}
              closeModal={this.closeLevelModal}
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
              closeModal={this.closeFlagModal}
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
                  style={[styles.imageCell, styles.marginLeft]}
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
                text="results.view_species"
              />
            ) : (
              <GreenButton
                color={gradientColorLight}
                handlePress={() => navigation.navigate( "Camera" )}
                text="results.take_photo"
              />
            )}
          </View>
          <View style={styles.marginMedium} />
          {commonAncestor && rank !== ( 60 || 70 ) ? (
            <SpeciesNearby
              ancestorId={taxaId}
              lat={latitude}
              lng={longitude}
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
            <UserContext.Consumer>
              {user => (
                <>
                  {user.login ? (
                    <PostToiNat
                      color={gradientColorLight}
                      taxaInfo={{
                        preferredCommonName: taxaName || commonAncestor,
                        taxaId,
                        uri,
                        userImage,
                        scientificName,
                        latitude,
                        longitude,
                        time
                      }}
                    />
                  ) : null}
                </>
              ) }
            </UserContext.Consumer>
          </View>
          <Padding />
        </ScrollView>
        {match || seenDate
          ? <MatchFooter openFlagModal={this.openFlagModal} />
          : <Footer />}
      </View>
    );
  }
}

export default MatchScreen;
