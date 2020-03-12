// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import ChallengeMissionCard from "./ChallengeMissionCard";
import Padding from "../UIComponents/Padding";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +navigation: any,
  challenge: Object
}

const ChallengeDetailsContainer = ( {
  challenge,
  navigation
}: Props ) => (
  <View style={styles.whiteContainer}>
    {challenge && (
      <>
        {challenge.started && <ChallengeMissionCard challenge={challenge} />}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{i18n.t( challenge.description )}</Text>
        </View>
        <View style={styles.secondHeader}>
          <GreenText text="challenges.get_involved" />
        </View>
        <View style={styles.marginTop} />
        <Text style={styles.descriptionText}>
          {i18n.t( challenge.action )}
        </Text>
        <View style={styles.descriptionContainer}>
          <Image source={logos.wwfop} style={styles.row} />
          <Text style={styles.photographerText}>{i18n.t( challenge.photographer )}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate( "Challenges" )}
            style={styles.padding}
          >
            <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
    <Padding />
  </View>
);

export default ChallengeDetailsContainer;
