// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

import styles from "../../styles/menu/observations";

type Props = {
  navigation: any,
  item: Object
}

const ObservationCard = ( { navigation, item }: Props ) => (
  <TouchableOpacity
    style={styles.card}
    onPress={ () => navigation.push( "Species", {
      id: item.taxon.id,
      commonName: item.taxon.preferredCommonName,
      scientificName: item.taxon.name
    } )}
  >
    <Image style={styles.image} source={{ uri: item.taxon.defaultPhoto.mediumUrl }} />
    <View style={styles.speciesNameContainer}>
      <Text style={styles.commonNameText}>{item.taxon.preferredCommonName}</Text>
      <Text style={styles.scientificNameText}>{item.taxon.name}</Text>
    </View>
  </TouchableOpacity>
);

export default ObservationCard;
