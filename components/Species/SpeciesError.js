// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/speciesError";
import icons from "../../assets/icons";

type Props = {
  +seenTaxa: any,
  +checkForInternet: Function
}

const SpeciesError = ( { seenTaxa, checkForInternet }: Props ) => (
  <View style={styles.background}>
    <TouchableOpacity
      onPress={() => checkForInternet()}
      style={[styles.errorContainer, styles.center, styles.row]}
    >
      <Image source={icons.internet} />
      <Text style={styles.errorText}>{i18n.t( "species_detail.internet_error" )}</Text>
    </TouchableOpacity>
    {seenTaxa && <Text style={styles.text}>{i18n.t( "species_detail.species_saved" )}</Text>}
  </View>
);

export default SpeciesError;
