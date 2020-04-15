// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text
} from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";

import realmConfig from "../../models";
import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import ChallengeProgressCard from "./ChallengeProgressCard";
import GreenText from "../UIComponents/GreenText";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import NoChallenges from "../Home/Challenges/NoChallenges";
import ScrollWithHeader from "../UIComponents/ScrollWithHeader";

const ChallengeScreen = () => {
  const navigation = useNavigation();
  const [notStarted, setNotStarted] = useState( [] );
  const [started, setStarted] = useState( [] );
  const [completed, setCompleted] = useState( [] );
  const [loading, setLoading] = useState( true );
  const noChallenges = notStarted.length === 0 && started.length === 0;

  const fetchChallenges = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        setStarted( challengesStarted );
        setNotStarted( challengesNotStarted );
        setCompleted( challengesCompleted );
        setLoading( false );
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

  const renderStarted = () => (
    <>
      <View style={styles.header}>
        <GreenText text="challenges.in_progress" />
      </View>
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
      ) : (
        <View style={styles.noChallengeContainer}>
          <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_challenges_in_progress" )}</Text>
        </View>
      )}
    </>
  );

  const renderNotStarted = () => (
    <>
      <View style={styles.header}>
        <GreenText text="challenges.not_started" />
      </View>
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
      ) : (
        <View style={styles.noChallengeContainer}>
          <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_new_challenges_header" )}</Text>
          <Text style={styles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</Text>
        </View>
      )}
    </>
  );

  const renderCompleted = () => (
    <>
      <View style={styles.header}>
        <GreenText text="challenges.completed" />
      </View>
      {completed.length > 0 ? (
        completed.map( ( challenge ) => (
          <ChallengeProgressCard
            key={`${challenge.name}`}
            challenge={challenge}
          />
        ) )
      ) : (
        <View style={styles.noChallengeContainer}>
          <Text style={styles.noChallengeText}>{i18n.t( "challenges.no_completed_challenges" )}</Text>
        </View>
      )}
    </>
  );

  return (
    <ScrollWithHeader
      header="challenges.header"
      route="Home"
      loading={loading}
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
