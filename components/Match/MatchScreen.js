// @flow

import React, {
  useReducer,
  useCallback,
  useRef,
  useContext
} from "react";
import { View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/match/match";
import { colors } from "../../styles/global";
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import Spacer from "../UIComponents/TopSpacer";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";
import { CameraContext } from "../UserContext";
import { useScrollToTop } from "../../utility/customHooks";
import MatchModals from "./MatchModals";

const MatchScreen = () => {
  const scrollView = useRef( null );
  const navigation = useNavigation();
  const { params } = useRoute();
  const { scientificNames } = useContext( CameraContext );
  const { image } = params;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "MISIDENTIFIED":
        return {
          ...state,
          seenDate: null,
          match: false,
          taxon: action.taxon
        };
      case "SET_NAV_PATH":
        return { ...state, navPath: action.path };
      case "SET_BADGES":
        return { ...state, latestBadge: action.latestBadge, latestLevel: action.latestLevel };
      case "SET_CHALLENGES":
        return {
          ...state,
          challenge: action.challenge,
          challengeInProgress: action.challengeInProgress
        };
      case "OPEN_FLAG_MODAL":
        return { ...state, flagModal: true };
      case "CLOSE_FLAG":
        return { ...state, flagModal: false };
      default:
        throw new Error();
    }
  }, {
    taxon: params.taxon,
    badge: null,
    seenDate: params.seenDate,
    latestLevel: null,
    challenge: null,
    challengeInProgress: null,
    navPath: null,
    firstRender: true,
    match: ( params.taxon && params.taxon.taxaName ) && !params.seenDate,
    challengeShown: false,
    flagModal: false
  } );

  const {
    taxon,
    seenDate,
    navPath,
    match,
    flagModal
  } = state;

  useScrollToTop( scrollView, navigation );

  const openFlagModal = () => dispatch( { type: "OPEN_FLAG_MODAL" } );

  const closeFlagModal = useCallback( ( showFailure ) => {
    dispatch( { type: "CLOSE_FLAG" } );
    if ( showFailure && taxon ) {
      let { commonAncestor, speciesSeenImage } = taxon;

      // this seems to be causing crashes on certain android devices when undefined
      if ( commonAncestor ) {
        commonAncestor = null;
      }

      if ( speciesSeenImage ) {
        speciesSeenImage = null;
      }

      dispatch( { type: "MISIDENTIFIED", taxon } );
    }
  }, [taxon] );

  const setNavigationPath = useCallback( ( path ) => dispatch( { type: "SET_NAV_PATH", path } ), [] );

  const renderSpeciesText = () => {
    const { taxaName, commonAncestor, scientificName } = taxon;

    if ( seenDate || ( taxaName && match ) ) {
      return !scientificNames ? taxaName : scientificName;
    } else if ( commonAncestor ) {
      return !scientificNames ? commonAncestor : scientificName;
    }
  };

  const { commonAncestor } = taxon;

  let gradientDark;
  let gradientLight;
  const speciesText = renderSpeciesText();

  if ( seenDate || match ) {
    gradientDark = colors.greenGradientDark;
    gradientLight = colors.seekForestGreen;
  } else if ( commonAncestor ) {
    gradientDark = colors.tealGradientDark;
    gradientLight = colors.seekTeal;
  } else {
    gradientDark = colors.grayGradientDark;
    gradientLight = colors.grayGradientLight;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: gradientDark }]} edges={["top"]}>
      <MatchModals
        match={match}
        flagModal={flagModal}
        closeFlagModal={closeFlagModal}
        params={params}
        speciesText={speciesText}
        navPath={navPath}
        setNavigationPath={setNavigationPath}
      />
      <ScrollView ref={scrollView} contentContainerStyle={styles.whiteContainer}>
        <Spacer backgroundColor={gradientDark} />
        <MatchHeader
          gradientDark={gradientDark}
          gradientLight={gradientLight}
          setNavigationPath={setNavigationPath}
          image={image}
          taxon={taxon}
        />
        <MatchContainer
          image={image}
          taxon={taxon}
          seenDate={seenDate}
          match={match}
          speciesText={speciesText}
          setNavigationPath={setNavigationPath}
          gradientLight={gradientLight}
        />
        <Padding />
      </ScrollView>
      {( match || seenDate ) ? (
        <MatchFooter openFlagModal={openFlagModal} setNavigationPath={setNavigationPath} />
      ) : <Footer />}
    </SafeAreaView>
  );
};

export default MatchScreen;
