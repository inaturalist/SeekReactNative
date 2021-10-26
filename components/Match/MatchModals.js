// @flow

import React, {
  useEffect,
  useCallback,
  useReducer,
  useContext,
  useRef
} from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

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
import { useCommonName } from "../../utility/customHooks";
import { ObservationContext, SpeciesDetailContext } from "../UserContext";

type Props = {
  screenType: string,
  closeFlagModal: Function,
  setNavigationPath: Function,
  flagModal: boolean,
  navPath: ?string,
  scientificNames: boolean
};

const MatchModals = ( {
  screenType,
  closeFlagModal,
  setNavigationPath,
  flagModal,
  navPath,
  scientificNames
}: Props ): Node => {
  const { setId } = useContext( SpeciesDetailContext );
  const { observation } = useContext( ObservationContext );
  const navigation = useNavigation( );
  const taxon = observation && observation.taxon;
  const seenDate = taxon && taxon.seenDate;
  const taxaId = taxon && taxon.taxaId;
  let firstRender = useRef( true );

  const commonName = useCommonName( taxaId );

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
      default:
        throw new Error( );
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
    replacePhotoModal: false
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
    challengeModal
  } = state;

  const closeChallengeModal = ( ) => dispatch( { type: "SET_CHALLENGE_MODAL", status: false, challengeShown: true } );
  const closeReplacePhotoModal = ( ) => dispatch( { type: "SET_REPLACE_PHOTO_MODAL", status: false } );
  const closeLevelModal = ( ) => dispatch( { type: "SET_LEVEL_MODAL", status: false, levelShown: true } );

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
    if ( navPath === "Camera" || navPath === "Social" ) {
      setNavigationPath( null );
      navigation.navigate( navPath, navPath === "Social" && { taxon, commonName } );
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
    checkForNewBadges( ).then( ( { latestLevel, latestBadge } ) => { // eslint-disable-line no-shadow
      dispatch( { type: "SET_BADGES", latestLevel, latestBadge } );
    } ).catch( ( ) => console.log( "could not check for badges" ) );
  };

  const checkChallenges = ( ) => {
    checkForChallengesCompleted( ).then( ( { challengeComplete, challengeInProgress } ) => { // eslint-disable-line no-shadow
      dispatch( { type: "SET_CHALLENGES", challenge: challengeComplete, challengeInProgress } );
      setChallengeProgress( "none" );
    } ).catch( ( ) => console.log( "could not check for challenges" ) );
  };

  const checkModals = useCallback( ( ) => {
    if ( challenge && !challengeShown ) {
      dispatch( { type: "SET_CHALLENGE_MODAL", status: true, challengeShown: false } );
    } else if ( latestLevel && !levelShown ) {
      dispatch( { type: "SET_LEVEL_MODAL", status: true, levelShown: false } );
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
      if ( screenType === "newSpecies" && firstRender ) {
        checkChallenges( );
        checkBadges( );
      }
      if ( screenType === "resighted" && firstRender ) {
        dispatch( { type: "SET_REPLACE_PHOTO_MODAL", status: true } );
      }
    } );

    navigation.addListener( "blur", ( ) => {
      firstRender.current = false;
      if ( screenType === "newSpecies" ) {
        setChallengeProgress( "none" );
      }
    } );
  }, [navigation, screenType] );

  return (
    <>
      {firstRender && (
        <>
          <Toasts badge={badge} challenge={challengeInProgress} />
          {challenge && <RNModal
            showModal={challengeModal}
            closeModal={closeChallengeModal}
            modal={<ChallengeEarnedModal challenge={challenge} closeModal={closeChallengeModal} />}
          />}
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
          <Modal
            isVisible={replacePhotoModal}
            useNativeDriverForBackdrop
            useNativeDriver
          >
            <ReplacePhotoModal
              seenDate={seenDate}
              closeModal={closeReplacePhotoModal}
              commonName={commonName}
              scientificNames={scientificNames}
              taxon={taxon}
            />
          </Modal>
        </>
      )}
      <Modal
        isVisible={flagModal}
        useNativeDriverForBackdrop
        useNativeDriver
      >
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
