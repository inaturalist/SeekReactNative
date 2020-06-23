// @flow

import React, {
  useReducer,
  useCallback,
  useRef,
  useContext
} from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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
    console.log( showFailure, taxon, "show failure" );
    if ( showFailure ) {
      taxon.commonAncestor = null;
      taxon.speciesSeenImage = null;
      dispatch( { type: "MISIDENTIFIED", taxon } );
    }
  }, [taxon] );

  const setNavigationPath = ( path ) => dispatch( { type: "SET_NAV_PATH", path } );

  const renderSpeciesText = () => {
    const {
      taxaName,
      commonAncestor,
      scientificName
    } = taxon;

    let speciesText = null;

    if ( seenDate || ( taxaName && match ) ) {
      speciesText = !scientificNames ? taxaName : scientificName;
    } else if ( commonAncestor ) {
      speciesText = !scientificNames ? commonAncestor : scientificName;
    }

    return speciesText;
  };

  const { speciesSeenImage, commonAncestor } = taxon;

  let gradientColorDark;
  let gradientColorLight;
  const speciesText = renderSpeciesText();

  if ( seenDate || match ) {
    gradientColorDark = "#22784d";
    gradientColorLight = colors.seekForestGreen;
  } else if ( commonAncestor ) {
    gradientColorDark = "#175f67";
    gradientColorLight = colors.seekTeal;
  } else {
    gradientColorDark = "#404040";
    gradientColorLight = "#5e5e5e";
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.flex, { backgroundColor: gradientColorDark }]} />
      <MatchModals
        match={match}
        flagModal={flagModal}
        closeFlagModal={closeFlagModal}
        params={params}
        speciesSeenImage={speciesSeenImage}
        speciesText={speciesText}
        navPath={navPath}
        setNavigationPath={setNavigationPath}
      />
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
          speciesText={speciesText}
          setNavigationPath={setNavigationPath}
          gradientColorLight={gradientColorLight}
        />
        <Padding />
      </ScrollView>
      {( match || seenDate ) ? (
        <MatchFooter openFlagModal={openFlagModal} setNavigationPath={setNavigationPath} />
      ) : <Footer />}
    </View>
  );
};

export default MatchScreen;
