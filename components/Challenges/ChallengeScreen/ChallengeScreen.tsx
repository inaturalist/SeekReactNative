// @flow
import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import type { Node } from "react";

import styles from "../../../styles/challenges/challenges";
import ChallengeProgressCard from "./ChallengeProgressCard";
import GreenText from "../../UIComponents/GreenText";
import NoChallenges from "../../Home/Challenges/NoChallenges";
import EmptyChallengesCard from "./EmptyChallengesCard";
import ViewWithHeader from "../../UIComponents/Screens/ViewWithHeader";
import { useFetchChallenges } from "../hooks/challengeHooks";

const ChallengeScreen = ( ): Node => {
  const list = useFetchChallenges( );

  const extractKey = ( item, index ) => item + index;

  return (
    <ViewWithHeader testID="challenge-screen-container" header="challenges.header">
      <FlashList
        estimatedItemSize={100}
        scrollEventThrottle={1}
        contentContainerStyle={styles.challengeList}
        data={list}
        keyExtractor={extractKey}
        renderItem={( { item } ) => {
          if ( item.type === "header" ) {
            // Render header
            return <View style={styles.header}>
              <GreenText text={item.header} />
            </View>;
          } else if ( item.type === "empty" ) {
            // Render empty card
            return <EmptyChallengesCard type={item.empty} />;
          } else if ( item.type === "noChallenges" ) {
            // Render no challenges text
            return <View style={styles.noChallenges}>
              <NoChallenges />
            </View>;
          } else {
            // Render item
            return <ChallengeProgressCard
              challenge={item}
            />;
          }
        }}
        getItemType={( item ) => {
          if ( item.hasOwnProperty( "type" ) ) {
            return item.type;
          }
          return "challenge";
        }}
        removeClippedSubviews
      />
    </ViewWithHeader>
  );
};

export default ChallengeScreen;
