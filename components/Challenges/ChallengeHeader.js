// @flow

import React from "react";

import {
  TouchableOpacity,
  Text,
  View
} from "react-native";

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
    <Text style={styles.headerText}>Species you&apos;re most likely to see near: </Text>
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
          <Text style={styles.locationChooserText}>Loading...</Text>
        ) : (
          <Text
            style={styles.locationChooserText}
            numberOfLines={1}
            ellipsizeMode="middle"
          >{location} &#9660;</Text>
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
