// @flow

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import realmConfig from "../../models";
import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Padding from "../UIComponents/Padding";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenText from "../UIComponents/GreenText";
// import SafeAreaView from "../UIComponents/SafeAreaView";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import NoChallenges from "../Home/Challenges/NoChallenges";
import { useScrollToTop } from "../../utility/customHooks";
import BottomSpacer from "../UIComponents/BottomSpacer";

const ChallengeScreen = () => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const scrollView = useRef( null );
  const [notStarted, setNotStarted] = useState( [] );
  const [started, setStarted] = useState( [] );
  const [completed, setCompleted] = useState( [] );
  const noChallenges = notStarted.length === 0 && started.length === 0;

  useScrollToTop( scrollView, navigation );

  const fetchChallenges = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        setNotStarted( challengesNotStarted );
        setStarted( challengesStarted );
        setCompleted( challengesCompleted );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  useEffect( () => {
    recalculateChallenges();
    fetchChallenges();
  }, [] );

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
    <View>
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
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenHeader
        header="challenges.header"
        route="Home"
      />
      <ScrollView ref={scrollView} contentContainerStyle={styles.containerWhite}>
        {noChallenges && (
          <View style={styles.margins}>
            <NoChallenges />
          </View>
        )}
        {!noChallenges && renderStarted()}
        {!noChallenges && renderNotStarted()}
        {renderCompleted()}
        <Padding />
        <BottomSpacer />
      </ScrollView>
    </View>
  );
};

export default ChallengeScreen;
