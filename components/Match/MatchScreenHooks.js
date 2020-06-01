// @flow

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";

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
  fetchNumberSpeciesSeen
  // getRoute
} from "../../utility/helpers";
import { removeFromCollection } from "../../utility/observationHelpers";
import { showAppStoreReview, showPlayStoreReview } from "../../utility/reviewHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";

const MatchScreen = () => {
  const scrollView = useRef( null );
  const navigation = useNavigation();
  const { params } = useRoute();

  const {
    image,
    seenDate,
    errorCode
  } = params;

  const [taxon, setTaxon] = useState( params.taxon );
  const [badge, setBadge] = useState( null );
  const [latestLevel, setLatestLevel] = useState( null );
  const [challenge, setChallenge] = useState( null );
  const [challengeInProgress, setChallengeInProgress] = useState( null );
  const [navPath, setNavPath] = useState( null );
  const [firstRender, setFirstRender] = useState( true );
  // const [prevRoute, setPrevRoute] = useState( null );
  const [challengeModal, setChallengeModal] = useState( false );
  const [levelModal, setLevelModal] = useState( false );
  const [flagModal, setFlagModal] = useState( false );
  const [match, setMatch] = useState( params.taxon.taxaName && !seenDate );
  const [challengeShown, setChallengeShown] = useState( false );

  // const fetchRoute = async () => {
  //   const r = await getRoute();
  //   setPrevRoute( r );
  // };

  const closeChallengeModal = () => setChallengeModal( false );

  useEffect( () => {
    if ( levelModal ) {
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
  }, [levelModal] );

  const closeLevelModal = () => setLevelModal( false );

  const showFailureScreen = () => {
    taxon.commonAncestor = null;
    taxon.speciesSeenImage = null;
    setMatch( false );
    setTaxon( taxon );
  };

  const openFlagModal = () => setFlagModal( true );

  const closeFlagModal = ( showFailure ) => {
    setFlagModal( false );
    if ( showFailure ) {
      showFailureScreen();
    }
  };

  const checkBadges = () => {
    checkForNewBadges().then( ( { latestBadge, latestLevel } ) => {
      setBadge( latestBadge );
      setLatestLevel( latestLevel );
    } ).catch( () => console.log( "could not check for badges" ) );
  };

  const checkChallenges = () => {
    checkForChallengesCompleted().then( ( { challengeInProgress, challengeComplete } ) => {
      setChallengeInProgress( challengeInProgress );
      setChallenge( challengeComplete );
    } ).catch( () => console.log( "could not check for challenges" ) );
  };

  const navigateTo = useCallback( () => {
    const { taxaId } = taxon;

    if ( navPath === "Camera" ) {
      navigation.navigate( "Camera" );
    } else if ( navPath === "Species" ) {
      setSpeciesId( taxaId );
      // return user to match screen
      setRoute( "Match" );
      // full nav path for QuickActions
      navigation.navigate( "MainTab", { screen: "Species", params: { ...params } } );
    }
  }, [navPath, navigation, params, taxon] );

  const checkModals = useCallback( () => {
    console.log( "checking modals", challenge, latestLevel, challengeShown );
    if ( ( !challenge && !latestLevel ) || challengeShown ) {
    // removed route === "Match" so latestLevel modal shows, but not sure why that was here
      navigateTo();
    } else if ( challenge ) {
      setChallengeModal( true );
    } else if ( latestLevel ) {
      setLevelModal( true );
    }
  }, [challenge, latestLevel, challengeShown, navigateTo] );

  const setNavigationPath = ( path ) => setNavPath( path );
  //   checkModals();
  // };

  const checkLocationPermissions = useCallback( () => {
    console.log( firstRender, "first render in loc permissions " );
    if ( !image.latitude && firstRender ) {
      createLocationAlert( errorCode );
    }
  }, [image.latitude, errorCode, firstRender] );

  const scrollToTop = () => {
    if ( scrollView.current ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  };

  const deleteObservation = () => removeFromCollection( taxon.taxaId );

  useEffect( () => {
    console.log( challengeShown, navPath, "challenge shown and navpath" );
    if ( challengeShown || navPath ) {
      checkModals();
    }
  }, [challengeShown, navPath, checkModals] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( match ) {
        checkChallenges();
        checkBadges();
        checkLocationPermissions();
      }
      scrollToTop();
      // fetchRoute();
    } );

    navigation.addListener( "blur", () => {
      setFirstRender( false );
      if ( match ) {
        setChallengeProgress( "none" );
      }
    } );
  }, [navigation, match, checkLocationPermissions] );

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
      {( match && firstRender ) && (
        <>
          <Toasts
            badge={badge}
            challenge={challengeInProgress}
          />
          <Modal
            isVisible={challengeModal}
            onBackdropPress={() => closeChallengeModal()}
            onModalHide={() => setChallengeShown( true )}
            onSwipeComplete={() => closeChallengeModal()}
            swipeDirection="down"
          >
            <ChallengeEarnedModal
              challenge={challenge}
              closeModal={closeChallengeModal}
            />
          </Modal>
          <Modal
            isVisible={levelModal}
            onBackdropPress={() => closeLevelModal()}
            onModalHide={() => navigateTo()}
            onSwipeComplete={() => closeLevelModal()}
            swipeDirection="down"
          >
            <LevelModal
              level={latestLevel}
              speciesCount={latestLevel ? latestLevel.count : 0}
              closeModal={closeLevelModal}
            />
          </Modal>
        </>
      )}
      {( match || seenDate ) && (
        <Modal isVisible={flagModal}>
          <FlagModal
            deleteObservation={deleteObservation}
            seenDate={seenDate}
            speciesSeenImage={speciesSeenImage}
            speciesText={speciesText}
            closeModal={closeFlagModal}
            userImage={image.uri}
          />
        </Modal>
      )}
      <ScrollView ref={scrollView}>
        <Spacer backgroundColor={gradientColorDark} />
        <MatchHeader
          gradientColorDark={gradientColorDark}
          gradientColorLight={gradientColorLight}
          setNavigationPath={setNavigationPath}
          userImage={image.uri}
          speciesSeenImage={speciesSeenImage}
        />
        <MatchContainer
          image={image}
          taxon={taxon}
          seenDate={seenDate}
          match={match}
          setNavigationPath={setNavigationPath}
          gradientColorLight={gradientColorLight}
        />
        <Padding />
      </ScrollView>
      {match || seenDate
        ? <MatchFooter openFlagModal={openFlagModal} />
        : <Footer />}
    </View>
  );
};

export default MatchScreen;
