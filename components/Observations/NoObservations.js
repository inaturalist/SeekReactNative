// @flow

import React from "react";
import {
  TouchableOpacity,
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations";

type Props = {
  navigation: any
}

const NoObservations = ( { navigation }: Props ) => (
  <View style={styles.noSpecies}>
    <Text style={styles.noSpeciesHeaderText}>
      {i18n.t( "observations.no_obs" ).toLocaleUpperCase()}
    </Text>
    <Text style={styles.noSpeciesText}>
      {i18n.t( "observations.help" )}
    </Text>
    <TouchableOpacity
      onPress={() => navigation.navigate( "Camera" )}
      style={styles.greenButton}
    >
      <Text style={styles.buttonText}>
        {i18n.t( "observations.open_camera" ).toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  </View>
);

export default NoObservations;
