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
      <Text style={styles.locationChooserText}>
        {location} &#9660;
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.taxonChooser}
      onPress={() => navigation.navigate( "Loading" )}
    >
      <Text style={styles.taxonChooserText}>All species &#9660;</Text>
    </TouchableOpacity>
  </View>
);

export default ChallengeHeader;
