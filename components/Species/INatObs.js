// @flow
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/iNatObs";
import logos from "../../assets/logos";

type Props = {
  location: string,
  nearbySpeciesCount: number,
  timesSeen: number,
  navigation: any
};

const INatObs = ( {
  location,
  nearbySpeciesCount,
  timesSeen,
  navigation
}: Props ) => (
  <View style={styles.stats}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate( "iNatStats" )}
    >
      <Image source={logos.bird} style={styles.image} />
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <Text style={styles.secondHeaderText}>
        {i18n.t( "species_detail.near" )}
        {" "}
        {location}
      </Text>
      <Text style={styles.number}>
        {i18n.toNumber( nearbySpeciesCount, { precision: 0 } )}
      </Text>
      <Text style={[styles.secondHeaderText, { marginTop: 28 }]}>{i18n.t( "species_detail.worldwide" )}</Text>
      <Text style={styles.number}>
        {i18n.toNumber( timesSeen, { precision: 0 } )}
      </Text>
    </View>
  </View>
);

export default INatObs;
