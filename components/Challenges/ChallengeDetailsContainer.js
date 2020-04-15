// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isAfter } from "date-fns";

import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import ChallengeMissionCard from "./ChallengeMissionCard";
import GreenText from "../UIComponents/GreenText";

type Props = {
  challenge: Object
}

const ChallengeDetailsContainer = ( { challenge }: Props ) => {
  const navigation = useNavigation();
  const is2020Challenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  return (
    <View style={styles.whiteContainer}>
      {challenge && (
        <>
          {challenge.startedDate && <ChallengeMissionCard challenge={challenge} />}
          <View style={styles.marginSmall} />
          <Text style={styles.descriptionText}>{i18n.t( challenge.description )}</Text>
          <View style={styles.marginLarge} />
          <GreenText text="challenges.get_involved" />
          <View style={styles.marginSmall} />
          <Text style={styles.descriptionText}>
            {i18n.t( challenge.action )}
          </Text>
          {!is2020Challenge && (
            <View style={styles.opContainer}>
              <Image source={logos.wwfop} />
            </View>
          )}
            {!is2020Challenge
              && (
              <Text style={[styles.descriptionText, styles.photographerText]}>
                {i18n.t( challenge.photographer )}
              </Text>
              )}
          <View style={styles.marginMedium} />
          <Text
            onPress={() => navigation.navigate( "Challenges" )}
            style={styles.viewText}
          >
            {i18n.t( "challenges_card.view_all" )}
          </Text>
          <View style={styles.marginMedium} />
        </>
      )}
    </View>
  );
};

export default ChallengeDetailsContainer;
