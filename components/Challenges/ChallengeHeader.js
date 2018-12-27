// @flow

import React from "react";

import {
  TouchableOpacity,
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/challenges";
import { capitalizeNames } from "../../utility/helpers";

type Props = {
  navigation: any,
  latitude: number,
  loading: boolean,
  longitude: number,
  location: string,
  taxaType: string
}

const ChallengeHeader = ( {
  navigation,
  latitude,
  loading,
  longitude,
  location,
  taxaType
}: Props ) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>
      {i18n.t( "challenges.species_likely", { language: i18n.currentLocale() } )}
      {":"}
    </Text>
    <View style={styles.buttons}>
      <TouchableOpacity
        style={styles.locationChooser}
        onPress={() => navigation.navigate( "Location", {
          location,
          latitude,
          longitude,
          taxaType
        } )}
      >
        { loading ? (
          <Text style={styles.locationChooserText}>{i18n.t( "challenges.loading_location", { language: i18n.currentLocale() } )}</Text>
        ) : (
          <Text
            style={styles.locationChooserText}
            numberOfLines={1}
            ellipsizeMode="middle"
          >{i18n.t( "challenges.location", { defaultValue: "{{location}}", location } )} &#9660;</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taxonChooser}
        onPress={() => navigation.navigate( "Taxon", { taxaType, latitude, longitude } )}
      >
        {taxaType === "all"
          ? <Text style={styles.taxonChooserText}>All species &#9660;</Text>
          : <Text style={styles.taxonChooserText}>{capitalizeNames( taxaType )} &#9660;</Text>
        }
      </TouchableOpacity>
    </View>
  </View>
);

export default ChallengeHeader;
