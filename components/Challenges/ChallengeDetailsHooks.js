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

import realmConfig from "../../models/index";
import styles from "../../styles/challenges/challengeDetails";
import ChallengeDetailsHeader from "./ChallengeDetailsHeader";
import { startChallenge, recalculateChallenges } from "../../utility/challengeHelpers";
import Spacer from "../UIComponents/iOSSpacer";
import ChallengeDetailsContainer from "./ChallengeDetailsContainer";
import { useScrollToTop, useIndex, useRoute } from "../../utility/customHooks";

type Props = {
  +navigation: any
}

const ChallengeDetailsScreen = ( { navigation }: Props ) => {
  const scrollView = useRef( null );
  const index = useIndex( navigation );
  const route = useRoute( navigation );
  const [challenge, setChallenge] = useState( null );
  const [missions, setMissions] = useState( [] );

  useScrollToTop( scrollView, navigation ); // custom, reusable hook

  useEffect( () => {
    if ( challenge ) {
      const missionList = Object.keys( challenge.missions ).map(
        mission => challenge.missions[mission]
      );
      const observationsList = Object.keys( challenge.numbersObserved ).map(
        number => challenge.numbersObserved[number]
      );

      const finalMissions = [];

      missionList.forEach( ( mission, i ) => {
        finalMissions.push( {
          mission,
          observations: observationsList[i]
        } );
      } );

      setMissions( finalMissions );
    }
  }, [challenge] );

  const fetchChallengeDetails = useCallback( () => {
    console.log( index, "index in challenge details fetch" );
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${String( index )}` );
        setChallenge( challenges[0] );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }, [index] );

  const showMission = () => {
    startChallenge( index );
    fetchChallengeDetails();
  };

  useEffect( () => {
    console.log( index, "index in use effect" );
    if ( index ) {
      fetchChallengeDetails();
    }
  }, [index, fetchChallengeDetails] );

  useEffect( () => {
    recalculateChallenges();
  }, [] );

  console.log( index, route, challenge.month, missions.length, "stuff" );

  return (
    <ScrollView
      contentContainerStyle={styles.background}
      ref={scrollView}
    >
      <SafeAreaView style={styles.safeView}>
        <StatusBar barStyle="light-content" />
        {Platform.OS === "ios" && <Spacer backgroundColor="#000000" />}
        <ChallengeDetailsHeader
          challenge={challenge}
          navigation={navigation}
          route={route}
          showMission={showMission}
        />
        <ChallengeDetailsContainer
          challenge={challenge}
          navigation={navigation}
          missions={missions}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ChallengeDetailsScreen;
