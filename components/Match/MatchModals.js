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
import { fetchNumberSpeciesSeen, setSpeciesId, setRoute } from "../../utility/helpers";
import { showAppStoreReview, showPlayStoreReview } from "../../utility/reviewHelpers";
import RNModal from "../UIComponents/Modal";

type Props = {
  match: boolean,
  closeFlagModal: Function,
  setNavigationPath: Function,
  params: Object,
  flagModal: boolean,
  speciesSeenImage: string,
  speciesText: ?string,
  navPath: ?string
};

const MatchModals = ( {
  match,
  closeFlagModal,
  params,
  setNavigationPath,
  flagModal,
  speciesSeenImage,
  speciesText,
  navPath
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
    latestLevel: null,
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

  const checkModals = useCallback( () => {
    if ( navPath ) {
      if ( ( !challenge && !latestLevel ) || challengeShown ) {
        navigateTo();
      } else if ( challenge ) {
        dispatch( { type: "SET_CHALLENGE_MODAL", status: true, challengeShown: false } );
      } else if ( latestLevel ) {
        dispatch( { type: "SET_LEVEL_MODAL", status: true } );
      }
    }
  }, [navPath, challenge, latestLevel, challengeShown, navigateTo] );

  const checkBadges = () => {
    checkForNewBadges().then( ( { latestLevel, latestBadge } ) => {
      dispatch( { type: "SET_BADGES", latestLevel, latestBadge } );
    } ).catch( () => console.log( "could not check for badges" ) );
  };

  const checkChallenges = () => {
    checkForChallengesCompleted().then( ( { challengeComplete, challengeInProgress } ) => {
      dispatch( { type: "SET_CHALLENGES", challenge: challengeComplete, challengeInProgress } );
      console.log( "setting challenge progress to none" );
      setChallengeProgress( "none" );
    } ).catch( () => console.log( "could not check for challenges" ) );
  };

  const checkLocationPermissions = useCallback( () => {
    if ( !image.latitude ) {
      createLocationAlert( errorCode );
    }
  }, [image.latitude, errorCode] );

  useEffect( () => {
    if ( challengeShown || navPath ) {
      checkModals();
    }
  }, [challengeShown, navPath, checkModals] );

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

  console.log( state, "state changes in match modals" );

  return (
    <>
      {firstRender && (
        <>
          <Toasts badge={badge} challenge={challengeInProgress} />
          <RNModal
            showModal={challengeModal}
            closeModal={() => closeChallengeModal()}
            modal={<ChallengeEarnedModal challenge={challenge} closeModal={closeChallengeModal} />}
          />
          <RNModal
            showModal={levelModal}
            closeModal={() => {
              navigateTo();
              closeLevelModal();
            }}
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
              userImage={image.uri}
              taxaId={taxon.taxaId}
            />
          </Modal>
        </>
      )}
      <Modal isVisible={flagModal}>
        <FlagModal
          taxaId={taxon.taxaId}
          seenDate={seenDate}
          speciesSeenImage={speciesSeenImage}
          speciesText={speciesText}
          closeModal={closeFlagModal}
          userImage={image.uri}
        />
      </Modal>
    </>
  );
};

export default MatchModals;
