// @flow
import React from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/species";

type Props = {
  stats: Object
};

const SpeciesStats = ( { stats }: Props ) => (
  <View style={styles.greenButtonContainer}>
    {stats.endangered ? (
      <View style={styles.greenButton}>
        <Text style={styles.greenButtonText}>{i18n.t( "species_detail.endangered" ).toLocaleUpperCase()}</Text>
      </View>
    ) : null}
    {stats.endemic ? (
      <View style={styles.greenButton}>
        <Text style={styles.greenButtonText}>{i18n.t( "species_detail.endemic" ).toLocaleUpperCase()}</Text>
      </View>
    ) : null}
    {stats.native ? (
      <View style={styles.greenButton}>
        <Text style={styles.greenButtonText}>{i18n.t( "species_detail.native" ).toLocaleUpperCase()}</Text>
      </View>
    ) : null}
    {stats.threatened ? (
      <View style={styles.greenButton}>
        <Text style={styles.greenButtonText}>{i18n.t( "species_detail.threatened" ).toLocaleUpperCase()}</Text>
      </View>
    ) : null}
    {stats.introduced ? (
      <View style={styles.greenButton}>
        <Text style={styles.greenButtonText}>{i18n.t( "species_detail.introduced" ).toLocaleUpperCase()}</Text>
      </View>
    ) : null}
  </View>
);

export default SpeciesStats;
