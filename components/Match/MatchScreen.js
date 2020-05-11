// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import Modal from "react-native-modal";
import { NavigationEvents } from "@react-navigation/compat";

import LevelModal from "../Modals/LevelModal";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import FlagModal from "../Modals/FlagModal";
import styles from "../../styles/match/match";
import { colors } from "../../styles/global";
import Toasts from "../Toasts/Toasts";
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import Spacer from "../UIComponents/TopSpacer";
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
import { createLocationAlert } from "../../utility/locationHelpers";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";

type Props = {
  +navigation: any,
  +route: any
}

type State = {
  taxon: Object,
  image: Object,
  badge: ?Object,
  latestLevel: ?Object,
  challenge: ?Object,
  challengeInProgress: ?Object,
  showChallengeModal: boolean,
  showLevelModal: boolean,
  showFlagModal: boolean,
  navigationPath: ?string,
  seenDate: ?string,
  match: boolean,
  challengeShown: boolean,
  errorCode: number,
  route: ?string
};

class MatchScreen extends Component<Props, State> {
  scrollView: ?any

  constructor( { route }: Props ) {
    super();

    const {
      image,
      taxon,
      seenDate,
      errorCode
    } = route.params;

    this.state = {
      image,
      taxon,
      badge: null,
      latestLevel: null,
      challenge: null,
      challengeInProgress: null,
      showChallengeModal: false,
      showLevelModal: false,
      showFlagModal: false,
      navigationPath: null,
      seenDate,
      match: taxon.taxaName && !seenDate,
      challengeShown: false,
      errorCode,
      route: null
    };

    ( this:any ).closeLevelModal = this.closeLevelModal.bind( this );
    ( this:any ).closeChallengeModal = this.closeChallengeModal.bind( this );
    ( this:any ).closeFlagModal = this.closeFlagModal.bind( this );
    ( this:any ).openFlagModal = this.openFlagModal.bind( this );
    ( this:any ).deleteObservation = this.deleteObservation.bind( this );
    ( this:any ).setNavigationPath = this.setNavigationPath.bind( this );
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
    console.log( "opening level modal" );
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
    const { taxon } = this.state;
    taxon.commonAncestor = null;
    taxon.speciesSeenImage = null;

    this.setState( {
      seenDate: null,
      match: false,
      taxon
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
    const { navigationPath, taxon } = this.state;
    const { navigation, route } = this.props;

    const { taxaId } = taxon;

    if ( navigationPath === "Camera" ) {
      navigation.navigate( "Camera" );
    } else if ( navigationPath === "Species" ) {
      setSpeciesId( taxaId );
      // return user to match screen
      setRoute( "Match" );
      navigation.navigate( "Species", { ...route.params } );
    }
  }

  checkModals() {
    const {
      challenge,
      latestLevel,
      challengeShown
    } = this.state;

    if ( ( !challenge && !latestLevel ) || challengeShown ) {
    // removed route === "Match" so latestLevel modal shows, but not sure why that was here
      this.navigateTo();
    } else if ( challenge ) {
      this.openChallengeModal();
    } else if ( latestLevel ) {
      this.openLevelModal();
    }
  }

  checkLocationPermissions() {
    const { image, errorCode } = this.state;

    if ( !image.latitude ) {
      createLocationAlert( errorCode );
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
    const { taxon } = this.state;
    removeFromCollection( taxon.taxaId );
  }

  render() {
    const {
      image,
      badge,
      showChallengeModal,
      showLevelModal,
      showFlagModal,
      latestLevel,
      challenge,
      challengeInProgress,
      seenDate,
      match,
      route,
      taxon
    } = this.state;

    const {
      taxaName,
      speciesSeenImage,
      commonAncestor
    } = taxon;

    let gradientColorDark;
    let gradientColorLight;
    let speciesText;

    if ( seenDate || match ) {
      gradientColorDark = "#22784d";
      gradientColorLight = colors.seekForestGreen;
      speciesText = taxaName;
    } else if ( commonAncestor ) {
      gradientColorDark = "#175f67";
      gradientColorLight = colors.seekTeal;
      speciesText = commonAncestor;
    } else {
      gradientColorDark = "#404040";
      gradientColorLight = "#5e5e5e";
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={[styles.flex, { backgroundColor: gradientColorDark }]} />
        <NavigationEvents
          onDidFocus={() => {
            if ( match ) {
              this.checkForChallengesCompleted();
              this.checkForNewBadges();
              this.checkLocationPermissions();
            }
          }}
          onWillBlur={() => {
            if ( match ) {
              setChallengeProgress( "none" );
            }
          }}
          onWillFocus={() => {
            this.scrollToTop();
            this.getRoute();
          }}
        />
        {( match && route !== "PostStatus" ) && ( // also removed route === "Match" here
          <Toasts
            badge={badge}
            challenge={challengeInProgress}
          />
        )}
        {( match ) && (
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
        )}
        {( match ) && (
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
        )}
        {( match || seenDate ) && (
          <Modal isVisible={showFlagModal}>
            <FlagModal
              deleteObservation={this.deleteObservation}
              seenDate={seenDate}
              speciesSeenImage={speciesSeenImage}
              speciesText={speciesText}
              closeModal={this.closeFlagModal}
              userImage={image.uri}
            />
          </Modal>
        )}
        <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
          <Spacer backgroundColor={gradientColorDark} />
          <MatchHeader
            gradientColorDark={gradientColorDark}
            gradientColorLight={gradientColorLight}
            setNavigationPath={this.setNavigationPath}
            userImage={image.uri}
            speciesSeenImage={speciesSeenImage}
          />
          <MatchContainer
            image={image}
            taxon={taxon}
            seenDate={seenDate}
            match={match}
            setNavigationPath={this.setNavigationPath}
            gradientColorLight={gradientColorLight}
            userImage={image.uri}
          />
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
