// @flow
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/speciesStats";

type Props = {
  +stats: Object
};

const SpeciesStats = ( { stats }: Props ) => {
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
      {stats.endangered ? (
        <TouchableOpacity
          onPress={() => showAlert( "endangered" )}
          style={styles.greenButton}
        >
          <Text style={styles.greenButtonText}>{i18n.t( "species_detail.endangered" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
      {stats.endemic ? (
        <TouchableOpacity
          onPress={() => showAlert( "endemic" )}
          style={styles.greenButton}
        >
          <Text style={styles.greenButtonText}>{i18n.t( "species_detail.endemic" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
      {stats.native ? (
        <TouchableOpacity
          onPress={() => showAlert( "native" )}
          style={styles.greenButton}
        >
          <Text style={styles.greenButtonText}>{i18n.t( "species_detail.native" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
      {stats.threatened ? (
        <TouchableOpacity
          onPress={() => showAlert( "threatened" )}
          style={styles.greenButton}
        >
          <Text style={styles.greenButtonText}>{i18n.t( "species_detail.threatened" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
      {stats.introduced ? (
        <TouchableOpacity
          onPress={() => showAlert( "introduced" )}
          style={styles.greenButton}
        >
          <Text style={styles.greenButtonText}>{i18n.t( "species_detail.introduced" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SpeciesStats;
