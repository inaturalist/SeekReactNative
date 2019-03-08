// @flow
import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/iNatObs";
import logos from "../../assets/logos";

type Props = {
  location: string,
  nearbySpeciesCount: number,
  timesSeen: number
};

const INatObs = ( { location, nearbySpeciesCount, timesSeen }: Props ) => (
  <View style={styles.stats}>
    <Image source={logos.bird} style={styles.image} />
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
