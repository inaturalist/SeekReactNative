// @flow

import React, { useState, useEffect, useRef } from "react";
import { View, SectionList } from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import realmConfig from "../../models";
import styles from "../../styles/challenges/challenges";
import ChallengeProgressCard from "./ChallengeProgressCard";
import GreenText from "../UIComponents/GreenText";
import { recalculateChallenges } from "../../utility/challengeHelpers";
import NoChallenges from "../Home/Challenges/NoChallenges";
import EmptyChallengesCard from "./EmptyChallengesCard";
import ViewWithHeader from "../UIComponents/Screens/ViewWithHeader";

const ChallengeScreen = (): Node => {
  const sectionList = useRef( null );
  const navigation = useNavigation();
  const [list, setList] = useState( [] );

  const fetchChallenges = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

        if ( noChallenges ) {
          setList( [{
            id: 0,
            data: [],
            header: "",
            empty: ""
          }, {
            id: 1,
            data: challengesCompleted,
            header: "challenges.completed",
            empty: "no_completed_challenges"
          }] );
        } else {
          setList( [{
            id: 0,
            data: challengesStarted,
            header: "challenges.in_progress",
            empty: "no_challenges_in_progress"
          }, {
            id: 1,
            data: challengesNotStarted,
            header: "challenges.not_started",
            empty: "no_new_challenges_header"
          }, {
            id: 2,
            data: challengesCompleted,
            header: "challenges.completed",
            empty: "no_completed_challenges"
          }] );
        }
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

  const renderSectionHeader = ( { section } ) => {
    const { id } = section;

    if ( list.length === 2 && id === 0 ) {
      return null;
    } else {
      return (
        <View style={styles.header}>
          <GreenText text={section.header} />
        </View>
      );
    }
  };

  const renderItem = ( { item, section, index } ) => (
    <ChallengeProgressCard
      key={`${item.name}`}
      challenge={item}
    />
  );

  const renderSectionFooter = ( { section } ) => {
    const { data, id } = section;

    if ( data.length !== 0 ) {
      return null;
    } else if ( list.length === 2 && id === 0 ) {
      return (
        <View style={styles.noChallenges}>
          <NoChallenges />
        </View>
      );
    } else {
      return (
        <EmptyChallengesCard type={section.empty} />
      );
    }
  };

  const renderSectionSeparator = ( ) => <View style={styles.separator} />;

  const extractKey = ( item, index ) => item + index;

  return (
    <ViewWithHeader header="challenges.header">
      <SectionList
        ref={sectionList}
        scrollEventThrottle={1}
        contentContainerStyle={styles.challengeList}
        sections={list}
        initialNumToRender={5}
        stickySectionHeadersEnabled={false}
        keyExtractor={extractKey}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        SectionSeparatorComponent={renderSectionSeparator}
        renderItem={renderItem}
        removeClippedSubviews
      />
    </ViewWithHeader>
  );
};

export default ChallengeScreen;
