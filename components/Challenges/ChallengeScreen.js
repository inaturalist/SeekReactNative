// @flow

import React from "react";
import { View, Text, Image } from "react-native";

import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import Footer from "../Home/Footer";

type Props = {
  navigation: any
}

const ChallengeScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.in_progress" ).toLocaleUpperCase()}
      </Text>
    </View>
    <Footer navigation={navigation} />
  </View>
);

export default ChallengeScreen;
