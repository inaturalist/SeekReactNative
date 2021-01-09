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
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import Spacer from "../UIComponents/TopSpacer";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";
import { CameraContext } from "../UserContext";
import { useCommonName, useScrollToTop } from "../../utility/customHooks";
import { renderSpeciesText, setGradients, setScreenType } from "../../utility/matchHelpers";
import MatchModals from "./MatchModals";

const MatchScreen = () => {
  const scrollView = useRef( null );
  const navigation = useNavigation();
  const { params } = useRoute();
  const { scientificNames } = useContext( CameraContext );
  const { taxon, seenDate } = params;

  const commonName = useCommonName( taxon.taxaId || null );

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SET_NAV_PATH":
        return { ...state, navPath: action.path };
      case "OPEN_FLAG_MODAL":
        return { ...state, flagModal: true };
      case "CLOSE_FLAG":
        return { ...state, flagModal: false, screenType: action.screenType };
      default:
        throw new Error();
    }
  }, {
    navPath: null,
    flagModal: false,
    screenType: setScreenType( taxon, seenDate )
  } );

  const { navPath, flagModal, screenType } = state;

  useScrollToTop( scrollView, navigation );

  const openFlagModal = () => dispatch( { type: "OPEN_FLAG_MODAL" } );

  const closeFlagModal = useCallback( ( showFailure ) => {
    if ( showFailure ) {
      dispatch( { type: "CLOSE_FLAG", screenType: "unidentified" } );
    } else {
      dispatch( { type: "CLOSE_FLAG", screenType } );
    }
  }, [screenType] );

  const setNavigationPath = useCallback( ( path ) => dispatch( { type: "SET_NAV_PATH", path } ), [] );

  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";

  const speciesText = renderSpeciesText( screenType, taxon, scientificNames, commonName );
  const { gradientDark } = setGradients( screenType );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: gradientDark }]} edges={["top"]}>
      <MatchModals
        screenType={screenType}
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
