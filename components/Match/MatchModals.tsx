import React, {
  useEffect,
  useCallback,
  useReducer,
  useState
} from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted, setChallengeProgress } from "../../utility/challengeHelpers";
import LevelModal from "../Modals/LevelModal";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import FlagModal from "../Modals/FlagModal";
import ReplacePhotoModal from "../Modals/ReplacePhotoModal";
import Toasts from "../Toasts/Toasts";
import { fetchNumberSpeciesSeen, setRoute } from "../../utility/helpers";
import { showStoreReview } from "../../utility/reviewHelpers";
import RNModal from "../UIComponents/Modals/Modal";
import { useCommonName } from "../../utility/customHooks/useCommonName";
import { Observation } from "../Providers/ObservationProvider";
import { useSpeciesDetail } from "../Providers/SpeciesDetailProvider";


  const { setId } = useSpeciesDetail( );
  const navigation = useNavigation( );
  const taxon = observation && observation.taxon;
  const seenDate = taxon && taxon.seenDate;
  const taxaId = taxon && taxon.taxaId;
enum ACTION_TYPE {
  SET_BADGES = "SET_BADGES",
  SET_CHALLENGES = "SET_CHALLENGES",
  SET_CHALLENGE_MODAL = "SET_CHALLENGE_MODAL",
  SET_LEVEL_MODAL = "SET_LEVEL_MODAL"
}

type Action =
  | { type: ACTION_TYPE.SET_BADGES; latestLevel: any; latestBadge: any }
  | { type: ACTION_TYPE.SET_CHALLENGES; challenge: any; challengeInProgress: any }
  | { type: ACTION_TYPE.SET_CHALLENGE_MODAL; challengeModal: boolean; challengeShown: boolean }
  | { type: ACTION_TYPE.SET_LEVEL_MODAL; levelModal: boolean; levelShown: boolean };

interface Props {
  observation: Observation;
  screenType: string;
  closeFlagModal: ( misidentified: boolean ) => void;
  setNavigationPath: ( path: string | null ) => void;
  flagModal: boolean;
  navPath: string | null;
  scientificNames: boolean;
}

const initialState: State = {
    latestLevel: null,
    levelShown: null,
    badge: null,
    challenge: null,
    challengeInProgress: null,
    challengeShown: false,
    challengeModal: false,
    levelModal: false
};

function reducer( state: State, action: Action ) {
    switch ( action.type ) {
      case ACTION_TYPE.SET_BADGES:
        return {
          ...state,
          latestLevel: action.latestLevel,
          badge: action.latestBadge,
          replacePhotoModal: false
        };
      case ACTION_TYPE.SET_CHALLENGES:
        return {
          ...state,
          challenge: action.challenge,
          challengeInProgress: action.challengeInProgress,
          replacePhotoModal: false
        };
      case ACTION_TYPE.SET_CHALLENGE_MODAL:
        return {
          ...state,
          challengeModal: action.challengeModal,
          challengeShown: action.challengeShown,
          replacePhotoModal: false
        };
      case ACTION_TYPE.SET_LEVEL_MODAL:
        return {
          ...state,
          levelModal: action.levelModal,
          levelShown: action.levelShown,
          replacePhotoModal: false
        };
      default:
        throw new Error( );
    }
  }

const MatchModals = ( {
  observation,
  screenType,
  closeFlagModal,
  setNavigationPath,
  flagModal,
  navPath,
  scientificNames
}: Props ) => {
  const commonName = useCommonName( taxaId );

  const [state, dispatch] = useReducer( reducer, initialState );
  const {
    levelShown,
    latestLevel,
    badge,
    challengeInProgress,
    challenge,
    challengeShown,
    levelModal,
    challengeModal
  } = state;

  const [replacePhotoModal, setReplacePhotoModal] = useState( undefined );

  const closeChallengeModal = ( ) => dispatch( { type: ACTION_TYPE.SET_CHALLENGE_MODAL, challengeModal: false, challengeShown: true } );
  const closeReplacePhotoModal = ( ) => setReplacePhotoModal( false );
  const closeLevelModal = ( ) => dispatch( { type: ACTION_TYPE.SET_LEVEL_MODAL, levelModal: false, levelShown: true } );

  useEffect( ( ) => {
    if ( levelModal ) {
      fetchNumberSpeciesSeen( ).then( ( speciesCount ) => {
        if ( speciesCount === 30 || speciesCount === 75 ) {
          // trigger review at 30 and 75 species
          showStoreReview( );
        }
      } );
    }
  }, [levelModal] );

  const navigateTo = useCallback( ( ) => {
    if ( navPath === "Camera" ) {
      setNavigationPath( null );
      navigation.reset( {
        index: 0,
        routes: [{ name: "Home" }]
      } );
      navigation.navigate( "Camera" );
    } else if ( navPath === "Social" ) {
      setNavigationPath( null );
      navigation.navigate( "Social", { taxon, commonName } );
    } else if ( navPath === "Species" ) {
      setNavigationPath( null );
      setId( taxaId );
      // return user to match screen
      setRoute( "Match" );
      // params are not actually working here, and I'm not sure why
      navigation.navigate( "Species" );
    } else if ( navPath === "Drawer" ) {
      setNavigationPath( null );
      navigation.openDrawer( );
    }
  }, [navPath, navigation, taxon, setNavigationPath, commonName, setId, taxaId] );

  const checkBadges = ( ) => {
    checkForNewBadges( ).then( ( { latestLevel, latestBadge }: { latestLevel: any; latestBadge: any } ) => {
      dispatch( { type: ACTION_TYPE.SET_BADGES, latestLevel, latestBadge } );
    } ).catch( ( ) => console.log( "could not check for badges" ) );
  };

  const checkChallenges = ( ) => {
    checkForChallengesCompleted( ).then( ( { challengeComplete, challengeInProgress }: { challengeComplete: any; challengeInProgress: any } ) => {
      dispatch( { type: ACTION_TYPE.SET_CHALLENGES, challenge: challengeComplete, challengeInProgress } );
      setChallengeProgress( "none" );
    } ).catch( ( ) => console.log( "could not check for challenges" ) );
  };

  const checkModals = useCallback( ( ) => {
    if ( challenge && !challengeShown ) {
      dispatch( { type: ACTION_TYPE.SET_CHALLENGE_MODAL, challengeModal: true, challengeShown: false } );
    } else if ( latestLevel && !levelShown ) {
      dispatch( { type: ACTION_TYPE.SET_LEVEL_MODAL, levelModal: true, levelShown: false } );
    } else {
      navigateTo( );
    }
  }, [challenge, challengeShown, latestLevel, levelShown, navigateTo] );

  useEffect( ( ) => {
    let isCurrent = true;
    if ( navPath && isCurrent ) {
      checkModals( );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [navPath, checkModals] );

  useEffect( ( ) => {
    navigation.addListener( "focus", ( ) => {
      if ( screenType === "newSpecies" ) {
        checkChallenges( );
        checkBadges( );
      }
      if ( screenType === "resighted" ) {
        if ( replacePhotoModal === undefined ) {
          setReplacePhotoModal( true );
        }
      }
    } );

    navigation.addListener( "blur", ( ) => {
      if ( screenType === "newSpecies" ) {
        setChallengeProgress( "none" );
      }
    } );
  }, [navigation, screenType, replacePhotoModal] );

  return (
    <>
      <Toasts badge={badge} challenge={challengeInProgress} />
      {challenge && (
        <RNModal
          showModal={challengeModal}
          closeModal={closeChallengeModal}
          modal={
            <ChallengeEarnedModal
              challenge={challenge}
              closeModal={closeChallengeModal}
            />
          }
        />
      )}
      <RNModal
        showModal={levelModal}
        closeModal={closeLevelModal}
        modal={
          <LevelModal
            level={latestLevel}
            speciesCount={latestLevel ? latestLevel.count : 0}
            closeModal={closeLevelModal}
          />
        }
      />
      <Modal
        isVisible={replacePhotoModal}
        useNativeDriverForBackdrop
        useNativeDriver
        // the following two lines prevent flickering
        // while modal is closing
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
      >
        <ReplacePhotoModal
          seenDate={seenDate}
          closeModal={closeReplacePhotoModal}
          commonName={commonName}
          scientificNames={scientificNames}
          taxon={taxon}
        />
      </Modal>
      <Modal isVisible={flagModal} useNativeDriverForBackdrop useNativeDriver>
        <FlagModal
          taxon={taxon}
          seenDate={seenDate}
          commonName={commonName}
          scientificNames={scientificNames}
          closeModal={closeFlagModal}
        />
      </Modal>
    </>
  );
};

export default MatchModals;
