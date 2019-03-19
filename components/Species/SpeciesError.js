import React from "react";
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
  seenDate: any,
  checkInternetConnection: Function
}

const SpeciesError = ( { seenDate, checkInternetConnection }: Props ) => (
  <View>
    <TouchableOpacity
      style={styles.errorContainer}
      onPress={() => checkInternetConnection()}
    >
      <View style={styles.errorRow}>
        <Image source={icons.internet} />
        <Text style={styles.errorText}>{i18n.t( "species_nearby.internet_error" )}</Text>
      </View>
    </TouchableOpacity>
    {seenDate ? (
      <View style={styles.textContainer}>
        <Text style={[styles.text, { textAlign: "center" }]}>{i18n.t( "species_detail.species_saved" )}</Text>
      </View>
    ) : null}
  </View>
);

export default SpeciesError;
