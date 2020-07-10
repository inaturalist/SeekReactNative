// @flow
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/species/speciesStats";

type Props = {
  +stats: Object
};

const SpeciesStats = ( { stats }: Props ) => {
  const statuses = ["endangered", "endemic", "native", "threatened", "introduced"];

  const showAlert = ( type ) => {
    const title = `species_detail.${type}`;
    Alert.alert(
      i18n.t( title ),
      i18n.t( `species_detail.${type}_about` ),
      [{ text: i18n.t( "species_detail.got_it" ) }]
    );
  };

  return (
    <View style={styles.greenButtonContainer}>
      {statuses.map( ( status ) => stats[status] && (
        <TouchableOpacity
          onPress={() => showAlert( status )}
          style={styles.greenButton}
          key={status}
        >
          <Text style={styles.greenButtonText}>{i18n.t( `species_detail.${status}` ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      ) )}
    </View>
  );
};

export default SpeciesStats;
