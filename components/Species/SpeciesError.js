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
  +seenDate: any,
  +updateScreen: Function
}

const SpeciesError = ( { seenDate, updateScreen }: Props ) => (
  <View>
    <TouchableOpacity
      onPress={() => updateScreen()}
      style={styles.errorContainer}
    >
      <View style={styles.errorRow}>
        <Image source={icons.internet} />
        <Text style={styles.errorText}>{i18n.t( "species_detail.internet_error" )}</Text>
      </View>
    </TouchableOpacity>
    {seenDate ? (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "species_detail.species_saved" )}</Text>
      </View>
    ) : null}
  </View>
);

export default SpeciesError;
