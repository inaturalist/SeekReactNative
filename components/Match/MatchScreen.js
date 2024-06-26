// @flow

import React, { useReducer, useCallback, useRef } from "react";
import { BackHandler, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/match/match";
import Footer from "../UIComponents/Footer";
import MatchFooter from "./MatchFooter";
import Padding from "../UIComponents/Padding";
import TopSpacer from "../UIComponents/TopSpacer";
import MatchHeader from "./MatchHeader";
import MatchContainer from "./MatchContainer";
import { useScrollToTop } from "../../utility/customHooks";
import { useFetchUserSettings } from "../../utility/customHooks/useFetchUserSettings";
import { setGradients, setScreenType } from "../../utility/matchHelpers";
import MatchModals from "./MatchModals";
import { useObservation } from "../Providers/ObservationProvider";

const MatchScreen = ( ): Node => {
  const { observation } = useObservation();
  const scrollView = useRef<any>( null );
  const navigation = useNavigation( );
  const settings = useFetchUserSettings( );
  const scientificNames = settings?.scientificNames;
  const taxon = observation && observation.taxon;
  const seenDate = taxon && taxon.seenDate;

  // move this out of state, so can navigate with .navigate instead of .push
  const screenType = setScreenType( taxon, seenDate );

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
    flagModal: false
  } );

  const { navPath, flagModal } = state;

  useScrollToTop( scrollView, navigation );

  const openFlagModal = ( ) => dispatch( { type: "OPEN_FLAG_MODAL" } );

  const closeFlagModal = useCallback( ( showFailure ) => {
    if ( showFailure ) {
      dispatch( { type: "CLOSE_FLAG", screenType: "unidentified" } );
    } else {
      dispatch( { type: "CLOSE_FLAG", screenType } );
    }
  }, [screenType] );

  const setNavigationPath = useCallback( ( path: string ) => dispatch( { type: "SET_NAV_PATH", path } ), [] );

  useFocusEffect(
    useCallback( () => {
      const onBackPress = () => {
        setNavigationPath( "Camera" );
        return true;
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return () =>
        BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [setNavigationPath] )
  );

  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";
  const { gradientDark } = setGradients( screenType );

  if ( !observation ) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: gradientDark }]} edges={["top"]}>
      <MatchModals
        observation={observation}
        screenType={screenType}
        flagModal={flagModal}
        closeFlagModal={closeFlagModal}
        navPath={navPath}
        setNavigationPath={setNavigationPath}
        scientificNames={scientificNames}
      />
      <ScrollView ref={scrollView} contentContainerStyle={styles.whiteContainer}>
        <TopSpacer backgroundColor={gradientDark} />
        <MatchHeader
          observation={observation}
          screenType={screenType}
          setNavigationPath={setNavigationPath}
        />
        <MatchContainer
          observation={observation}
          screenType={screenType}
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
