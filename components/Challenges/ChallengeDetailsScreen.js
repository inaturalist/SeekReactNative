// @flow

import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import Realm from "realm";
import { useNavigation, useIsFocused } from "react-navigation-hooks";

import realmConfig from "../../models";
import styles from "../../styles/challenges/challengeDetails";
import ChallengeDetailsHeader from "./ChallengeDetailsHeader";
import { getChallengeIndex, recalculateChallenges } from "../../utility/challengeHelpers";
import Spacer from "../UIComponents/iOSSpacer";
import ChallengeDetailsContainer from "./ChallengeDetailsContainer";
import { useScrollToTop } from "../../utility/customHooks";

const ChallengeDetailsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scrollView = useRef( null );
  const [challenge, setChallenge] = useState( null );

  useScrollToTop( scrollView, navigation ); // custom, reusable hook

  const fetchChallenge = ( index ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${String( index )}` );
        setChallenge( challenges[0] );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  const setupScreen = useCallback( async () => {
    recalculateChallenges();
    const index = await getChallengeIndex();

    if ( !challenge || challenge.index !== index ) {
      fetchChallenge( index );
    }
  }, [challenge] );

  useEffect( () => {
    if ( isFocused ) { // need this for screens where challenge index must change
      setupScreen();
    } else {
      setChallenge( null ); // reset necessary for race condition on iOS
    }
  }, [setupScreen, isFocused] );

  return (
    <>
      <SafeAreaView style={styles.safeView} />
      <SafeAreaView style={styles.background}>
        <ScrollView ref={scrollView}>
          <StatusBar barStyle="light-content" />
          {Platform.OS === "ios" && <Spacer backgroundColor="#000000" />}
          <ChallengeDetailsHeader
            challenge={challenge}
            showMission={fetchChallenge}
          />
          <ChallengeDetailsContainer
            challenge={challenge}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ChallengeDetailsScreen;
