// @flow

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";

import realmConfig from "../../models";
import { colors } from "../../styles/global";
import styles from "../../styles/challenges/challenges";
import ChallengeProgressCard from "./ChallengeProgressCard";
import GreenText from "../UIComponents/GreenText";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import NoChallenges from "../Home/Challenges/NoChallenges";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import EmptyChallengesCard from "./EmptyChallengesCard";

const ChallengeScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState( {
    notStarted: [],
    started: [],
    completed: [],
    loading: true
  } );

  const { notStarted, started, completed, loading } = state;
  const noChallenges = notStarted.length === 0 && started.length === 0;

  const fetchChallenges = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        setState( {
          notStarted: challengesNotStarted,
          started: challengesStarted,
          completed: challengesCompleted,
          loading: false
        } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      recalculateChallenges();
      fetchChallenges();
    } );
  }, [navigation] );

  const renderHeader = text => (
    <View style={styles.header}>
      <GreenText text={text} />
    </View>
  );

  const renderStarted = () => (
    <>
      {renderHeader( "challenges.in_progress" )}
      {started.length > 0 ? (
        <>
          {started.map( ( challenge ) => (
            <ChallengeProgressCard
              key={`${challenge.name}`}
              challenge={challenge}
            />
          ) )}
          <View style={styles.margin} />
        </>
      ) : <EmptyChallengesCard type="no_challenges_in_progress" />}
    </>
  );

  const renderNotStarted = () => (
    <>
      {renderHeader( "challenges.not_started" )}
      {notStarted.length > 0 ? (
        <>
          {notStarted.map( ( challenge ) => (
            <ChallengeProgressCard
              key={`${challenge.name}`}
              fetchChallenges={fetchChallenges}
              challenge={challenge}
            />
          ) )}
          <View style={styles.margin} />
        </>
      ) : <EmptyChallengesCard type="no_new_challenges_header" />}
    </>
  );

  const renderCompleted = () => (
    <>
      {renderHeader( "challenges.completed" )}
      {completed.length > 0 ? completed.map( ( challenge ) => (
        <ChallengeProgressCard
          key={`${challenge.name}`}
          challenge={challenge}
        />
      )
      ) : <EmptyChallengesCard type="no_completed_challenges" />}
    </>
  );

  return (
    <ScrollWithHeader
      header="challenges.header"
      route="Home"
      loading={loading}
      backgroundColor={colors.black}
    >
      {noChallenges && (
        <View style={styles.margins}>
          <NoChallenges />
        </View>
      )}
      {!noChallenges && renderStarted()}
      {!noChallenges && renderNotStarted()}
      {renderCompleted()}
    </ScrollWithHeader>
  );
};

export default ChallengeScreen;
