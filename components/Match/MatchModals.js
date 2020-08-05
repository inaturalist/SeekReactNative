// @flow

import React, {
  useEffect,
  useCallback,
  useReducer
} from "react";
import { Platform } from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted, setChallengeProgress } from "../../utility/challengeHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";
import LevelModal from "../Modals/LevelModal";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import FlagModal from "../Modals/FlagModal";
import ReplacePhotoModal from "../Modals/ReplacePhotoModal";
import Toasts from "../Toasts/Toasts";
import { fetchNumberSpeciesSeen, setSpeciesId, setRoute } from "../../utility/helpers";
import { showAppStoreReview, showPlayStoreReview } from "../../utility/reviewHelpers";
import RNModal from "../UIComponents/Modals/Modal";

type Props = {
  match: boolean,
  closeFlagModal: Function,
  setNavigationPath: Function,
  params: Object,
  flagModal: boolean,
  speciesText: ?string,
  navPath: ?string
};

const MatchModals = ( {
  match,
  closeFlagModal,
  params,
  setNavigationPath,
  flagModal,
  speciesText,
  navPath
}: Props ) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
        return { ...state, latestLevel: action.latestLevel, badge: action.latestBadge };
      case "SET_CHALLENGES":
        return {
          ...state,
          challenge: action.challenge,
          challengeInProgress: action.challengeInProgress
        };
      case "SET_CHALLENGE_MODAL":
        return { ...state, challengeModal: action.status, challengeShown: action.challengeShown };
      case "SET_LEVEL_MODAL":
        return { ...state, levelModal: action.status, levelShown: action.levelShown };
      case "SET_REPLACE_PHOTO_MODAL":
        return { ...state, replacePhotoModal: action.status };
      case "SET_FIRST_RENDER":
        return { ...state, firstRender: false };
      default:
        throw new Error();
    }
  }, {
    latestLevel: null,
    levelShown: null,
    badge: null,
    challenge: null,
    challengeInProgress: null,
    challengeShown: false,
    challengeModal: false,
    levelModal: false,
    replacePhotoModal: false,
    firstRender: true
  } );

  const {
    levelShown,
    latestLevel,
    badge,
    challengeInProgress,
    challenge,
    challengeShown,
    replacePhotoModal,
    levelModal,
    challengeModal,
    firstRender
  } = state;

  const closeChallengeModal = () => dispatch( { type: "SET_CHALLENGE_MODAL", status: false, challengeShown: true } );
  const closeReplacePhotoModal = () => dispatch( { type: "SET_REPLACE_PHOTO_MODAL", status: false } );
  const closeLevelModal = () => dispatch( { type: "SET_LEVEL_MODAL", status: false, levelShown: true } );

  useEffect( () => {
    if ( seenDate && isFocused ) {
      dispatch( { type: "SET_REPLACE_PHOTO_MODAL", status: true } );
    }
  }, [seenDate, isFocused] );

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

  const navigateTo = useCallback( () => {
    const { taxaId } = taxon;

    if ( navPath === "Camera" ) {
      setNavigationPath( null );
      navigation.navigate( "Camera" );
    } else if ( navPath === "Species" ) {
      setNavigationPath( null );
      setSpeciesId( taxaId );
      // return user to match screen
      setRoute( "Match" );
      // full nav path for QuickActions
      navigation.navigate( "MainTab", { screen: "Species", params: { ...params } } );
    } else if ( navPath === "Drawer" ) {
      setNavigationPath( null );
      navigation.openDrawer();
    }
  }, [navPath, navigation, params, taxon, setNavigationPath] );

  const checkBadges = () => {
    checkForNewBadges().then( ( { latestLevel, latestBadge } ) => { // eslint-disable-line no-shadow
      dispatch( { type: "SET_BADGES", latestLevel, latestBadge } );
    } ).catch( () => console.log( "could not check for badges" ) );
  };

  const checkChallenges = () => {
    checkForChallengesCompleted().then( ( { challengeComplete, challengeInProgress } ) => { // eslint-disable-line no-shadow
      dispatch( { type: "SET_CHALLENGES", challenge: challengeComplete, challengeInProgress } );
      setChallengeProgress( "none" );
    } ).catch( () => console.log( "could not check for challenges" ) );
  };

  const checkLocationPermissions = useCallback( () => {
    if ( !image.latitude ) {
      console.log( "creating location alerts" );
      createLocationAlert( errorCode );
    }
  }, [image.latitude, errorCode] );

  const checkModals = useCallback( () => {
    if ( challenge && !challengeShown ) {
      dispatch( { type: "SET_CHALLENGE_MODAL", status: true, challengeShown: false } );
    } else if ( latestLevel && !levelShown ) {
      dispatch( { type: "SET_LEVEL_MODAL", status: true, levelShown: false } );
    } else {
      navigateTo();
    }
  }, [challenge, challengeShown, latestLevel, levelShown, navigateTo] );

  useEffect( () => {
    if ( navPath ) {
      checkModals();
    }
  }, [navPath, checkModals] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( match && firstRender ) {
        checkChallenges();
        checkBadges();
        checkLocationPermissions();
      }
    } );

    navigation.addListener( "blur", () => {
      dispatch( { type: "SET_FIRST_RENDER" } );
      if ( match ) {
        setChallengeProgress( "none" );
      }
    } );
  }, [navigation, match, firstRender, checkLocationPermissions] );

  return (
    <>
      {firstRender && (
        <>
          <Toasts badge={badge} challenge={challengeInProgress} />
          <RNModal
            showModal={challengeModal}
            closeModal={closeChallengeModal}
            modal={<ChallengeEarnedModal challenge={challenge} closeModal={closeChallengeModal} />}
          />
          <RNModal
            showModal={levelModal}
            closeModal={closeLevelModal}
            modal={(
              <LevelModal
                level={latestLevel}
                speciesCount={latestLevel ? latestLevel.count : 0}
                closeModal={closeLevelModal}
              />
            )}
          />
          <Modal isVisible={replacePhotoModal}>
            <ReplacePhotoModal
              seenDate={seenDate}
              speciesText={speciesText}
              closeModal={closeReplacePhotoModal}
              image={image}
              taxaId={taxon.taxaId}
            />
          </Modal>
        </>
      )}
      <Modal isVisible={flagModal}>
        <FlagModal
          taxon={taxon}
          seenDate={seenDate}
          speciesText={speciesText}
          closeModal={closeFlagModal}
          userImage={image.uri}
        />
      </Modal>
    </>
  );
};

export default MatchModals;
