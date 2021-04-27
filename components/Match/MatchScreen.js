// @flow

import React, { useReducer, useCallback, useRef, useContext } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import styles from "../../styles/match/match";
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import Spacer from "../UIComponents/TopSpacer";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";
import { useFetchUserSettings, useScrollToTop } from "../../utility/customHooks";
import { setGradients, setScreenType } from "../../utility/matchHelpers";
import MatchModals from "./MatchModals";

const MatchScreen = ( ): Node => {
  const scrollView = useRef<any>( null );
  const navigation = useNavigation( );
  const { params } = useRoute( );
  const { scientificNames } = useFetchUserSettings( );
  const { taxon, seenDate } = params;

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
        throw new Error( );
    }
  }, {
    navPath: null,
    flagModal: false,
    screenType: setScreenType( taxon, seenDate )
  } );

  const { navPath, flagModal, screenType } = state;

  useScrollToTop( scrollView, navigation );

  const openFlagModal = ( ) => dispatch( { type: "OPEN_FLAG_MODAL" } );

  const closeFlagModal = useCallback( ( showFailure ) => {
    if ( showFailure ) {
      dispatch( { type: "CLOSE_FLAG", screenType: "unidentified" } );
    } else {
      dispatch( { type: "CLOSE_FLAG", screenType } );
    }
  }, [screenType] );

  const setNavigationPath = useCallback( ( path ) => dispatch( { type: "SET_NAV_PATH", path } ), [] );

  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";
  const { gradientDark } = setGradients( screenType );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: gradientDark }]} edges={["top"]}>
      <MatchModals
        screenType={screenType}
        flagModal={flagModal}
        closeFlagModal={closeFlagModal}
        params={params}
        navPath={navPath}
        setNavigationPath={setNavigationPath}
        scientificNames={scientificNames}
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
          setNavigationPath={setNavigationPath}
          scientificNames={scientificNames}
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
