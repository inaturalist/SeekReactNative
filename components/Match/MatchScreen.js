// @flow

import React, {
  useReducer,
  useCallback,
  useRef,
  useContext
} from "react";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/match/match";
// import { colors } from "../../styles/global";
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import Spacer from "../UIComponents/TopSpacer";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";
import { CameraContext } from "../UserContext";
import { useScrollToTop } from "../../utility/customHooks";
import { renderSpeciesText, setGradients, setScreenType } from "../../utility/matchHelpers";
import MatchModals from "./MatchModals";

const MatchScreen = () => {
  const scrollView = useRef( null );
  const navigation = useNavigation();
  const { params } = useRoute();
  const { scientificNames } = useContext( CameraContext );
  const { taxon, seenDate } = params;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SET_NAV_PATH":
        return { ...state, navPath: action.path };
      case "OPEN_FLAG_MODAL":
        return { ...state, flagModal: true };
      case "CLOSE_FLAG":
        return { ...state, flagModal: false, match: action.match };
      default:
        throw new Error();
    }
  }, {
    navPath: null,
    flagModal: false,
    match: ( taxon && taxon.taxaName ) && !seenDate
  } );

  const { navPath, flagModal, match } = state;

  useScrollToTop( scrollView, navigation );

  const openFlagModal = () => dispatch( { type: "OPEN_FLAG_MODAL" } );

  const closeFlagModal = useCallback( ( showFailure ) => {
    if ( showFailure ) {
      params.taxon = {};
      params.seenDate = null;
      dispatch( { type: "CLOSE_FLAG", match: false } );
    } else {
      dispatch( { type: "CLOSE_FLAG", match } );
    }
  }, [params, match] );

  const setNavigationPath = useCallback( ( path ) => dispatch( { type: "SET_NAV_PATH", path } ), [] );

  const screenType = setScreenType( seenDate, match, taxon.commonAncestor );
  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";
  console.log( screenType, "screen type match screen" );

  const speciesText = renderSpeciesText( screenType, taxon, scientificNames );
  const { gradientDark } = setGradients( screenType );

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
          screenType={screenType}
          setNavigationPath={setNavigationPath}
          params={params}
        />
        <MatchContainer
          screenType={screenType}
          params={params}
          speciesText={speciesText}
          setNavigationPath={setNavigationPath}
        />
        <Padding />
      </ScrollView>
      {speciesIdentified
        ? <MatchFooter openFlagModal={openFlagModal} setNavigationPath={setNavigationPath} />
        : <Footer />}
    </SafeAreaView>
  );
};

export default MatchScreen;
