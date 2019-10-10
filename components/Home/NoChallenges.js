// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/home/challenges";

type Props = {
  navigation: any
}

const NoChallenges = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Challenges" )}
        >
          <Text style={styles.headerText}>
            {i18n.t( "challenges_card.header" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.noChallengeContainer}>
        <View style={styles.row}>
          <Image source={icons.completed} />
          <View style={styles.noChallengeTextContainer}>
            <Text style={[styles.noChallengeText, { textAlign: "left" }]}>{i18n.t( "challenges.completed_all" )}</Text>
            <Text style={[styles.lightText, { textAlign: "left", marginLeft: 0 }]}>{i18n.t( "challenges.no_new_challenges" )}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default NoChallenges;
