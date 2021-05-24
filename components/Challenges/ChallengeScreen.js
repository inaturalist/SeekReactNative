// @flow

import React, { useRef } from "react";
import { View, SectionList } from "react-native";
import type { Node } from "react";

import styles from "../../styles/challenges/challenges";
import ChallengeProgressCard from "./ChallengeProgressCard";
import GreenText from "../UIComponents/GreenText";
import NoChallenges from "../Home/Challenges/NoChallenges";
import EmptyChallengesCard from "./EmptyChallengesCard";
import ViewWithHeader from "../UIComponents/Screens/ViewWithHeader";
import { useFetchChallenges } from "./hooks/challengeHooks";

const ChallengeScreen = ( ): Node => {
  const list = useFetchChallenges( );
  const sectionList = useRef( null );

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
