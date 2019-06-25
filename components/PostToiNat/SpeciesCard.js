// @flow

import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text
} from "react-native";

import styles from "../../styles/posting/selectSpecies";

type Props = {
  image: string,
  commonName: string,
  scientificName: string
};

const SpeciesCard = ( { image, commonName, scientificName }: Props ) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => console.log( "clicked" )}
  >
    <Image style={styles.roundImage} source={{ uri: image }} />
    <View style={styles.speciesNameContainer}>
      <Text style={styles.commonNameText}>{commonName}</Text>
      <Text style={styles.scientificNameText}>{scientificName}</Text>
    </View>
  </TouchableOpacity>
);

export default SpeciesCard;
