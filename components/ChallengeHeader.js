// @flow

import React from "react";

import {
  TouchableOpacity,
  Text,
  View
} from "react-native";

import styles from "../styles/challenges";

type Props = {
  navigation: any,
  location: string
}

const ChallengeHeader = ( { navigation, location }: Props ) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Species you&apos;re most likely to see near: </Text>
    <TouchableOpacity
      style={styles.locationChooser}
      onPress={() => navigation.navigate( "Loading" )}
    >
      <Text style={styles.locationChooserText}>{location.toUpperCase()}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.taxonChooser}
      onPress={() => navigation.navigate( "Loading" )}
    >
      <Text style={styles.taxonChooserText}>Pick Taxon</Text>
    </TouchableOpacity>
  </View>
);

export default ChallengeHeader;
