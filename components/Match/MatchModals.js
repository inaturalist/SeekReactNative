// @flow

import React, {
  useEffect,
  useCallback,
  useReducer
} from "react";
import { Platform } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted, setChallengeProgress } from "../../utility/challengeHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";
import LevelModal from "../Modals/LevelModal";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import FlagModal from "../Modals/FlagModal";
import ReplacePhotoModal from "../Modals/ReplacePhotoModal";
import Toasts from "../Toasts/Toasts";
import { removeFromCollection } from "../../utility/observationHelpers";
import { fetchNumberSpeciesSeen } from "../../utility/helpers";
import { showAppStoreReview, showPlayStoreReview } from "../../utility/reviewHelpers";

type Props = {
  match: boolean,
  closeFlagModal: Function,
  navigateTo: Function,
  params: Object,
  flagModal: boolean,
  speciesSeenImage: string,
  speciesText: string
};

const MatchModals = ( {
  match,
  closeFlagModal,
  params,
  navigateTo,
  flagModal,
  speciesSeenImage,
  speciesText
}: Props ) => {
  const navigation = useNavigation();

  const {
    errorCode,
    seenDate,
    taxon,
    image
  } = params;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SET_BADGES":
        return { ...state, badge: action.latestBadge, latestLevel: action.latestLevel };
      case "SET_CHALLENGES":
        return {
          ...state,
          challenge: action.challenge,
          challengeInProgress: action.challengeInProgress
        };
      case "SET_CHALLENGE_MODAL":
        return { ...state, challengeModal: action.status };
      case "SET_LEVEL_MODAL":
        return { ...state, levelModal: action.status };
      case "SET_REPLACE_PHOTO_MODAL":
        return { ...state, replacePhotoModal: action.status };
      case "SET_CHALLENGE_SHOWN":
        return { ...state, challengeShown: action.status };
      case "SET_FIRST_RENDER":
        return { ...state, firstRender: false };
      default:
        throw new Error();
    }
  }, {
    badge: null,
    latestLevel: null,
    challenge: null,
    challengeInProgress: null,
    navPath: null,
    challengeShown: false,
    challengeModal: false,
    levelModal: false,
    replacePhotoModal: false,
    firstRender: true
  } );

  const {
    badge,
    latestLevel,
    challenge,
    challengeInProgress,
    navPath,
    challengeShown,
    replacePhotoModal,
    levelModal,
    challengeModal,
    firstRender
  } = state;

  const closeChallengeModal = () => dispatch( { type: "SET_CHALLENGE_MODAL", status: false } );
  const closeReplacePhotoModal = () => dispatch( { type: "SET_REPLACE_PHOTO_MODAL", status: false } );
  const closeLevelModal = () => dispatch( { type: "SET_LEVEL_MODAL", status: false } );

  useEffect( () => {
    if ( seenDate ) {
      dispatch( { type: "SET_REPLACE_PHOTO_MODAL", status: true } );
    }
  }, [seenDate] );

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

  const checkModals = useCallback( () => {
    console.log( "checking modals", challenge, latestLevel, challengeShown );
    if ( ( !challenge && !latestLevel ) || challengeShown ) {
    // removed route === "Match" so latestLevel modal shows, but not sure why that was here
      navigateTo();
    } else if ( challenge ) {
      dispatch( { type: "SET_CHALLENGE_MODAL", status: true } );
    } else if ( latestLevel ) {
      dispatch( { type: "SET_LEVEL_MODAL", status: true } );
    }
  }, [challenge, latestLevel, challengeShown, navigateTo] );

  useEffect( () => {
    console.log( challengeShown, navPath, "challenge shown and navpath" );
    if ( challengeShown || navPath ) {
      checkModals();
    }
  }, [challengeShown, navPath, checkModals] );

  const deleteObservation = () => removeFromCollection( taxon.taxaId );

  const checkBadges = () => {
    checkForNewBadges().then( ( { latestBadge, latestLevel } ) => {
      dispatch( { type: "SET_BADGES", latestBadge, latestLevel } );
    } ).catch( () => console.log( "could not check for badges" ) );
  };

  const checkChallenges = () => {
    checkForChallengesCompleted().then( ( { challengeInProgress, challengeComplete } ) => {
      dispatch( { type: "SET_CHALLENGES", challenge: challengeComplete, challengeInProgress } );
    } ).catch( () => console.log( "could not check for challenges" ) );
  };

  const checkLocationPermissions = useCallback( () => {
    if ( !image.latitude ) {
      createLocationAlert( errorCode );
    }
  }, [image.latitude, errorCode] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( match ) {
        checkChallenges();
        checkBadges();
        checkLocationPermissions();
      }
      // fetchRoute();
    } );

    navigation.addListener( "blur", () => {
      dispatch( { type: "SET_FIRST_RENDER" } );
      if ( match ) {
        setChallengeProgress( "none" );
      }
    } );
  }, [navigation, match, checkLocationPermissions] );

  console.log( state, "state in modals" );

  return (
    <>
      <Toasts badge={badge} challenge={challengeInProgress} />
      <Modal
        isVisible={challengeModal}
        onBackdropPress={() => closeChallengeModal()}
        onModalHide={() => dispatch( { type: "SET_CHALLENGE_SHOWN", status: true } )}
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
      <Modal isVisible={replacePhotoModal}>
        <ReplacePhotoModal
          seenDate={seenDate}
          speciesText={speciesText}
          closeModal={closeReplacePhotoModal}
          userImage={image.uri}
          taxaId={taxon.taxaId}
        />
      </Modal>
    </>
  );
};

export default MatchModals;
