// @flow

import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/posting/selectSpecies";

type Props = {
  image: string,
  commonName: string,
  scientificName: string,
  id: Number,
  updateTaxon: Function,
  toggleSpeciesModal: Function
};

const SpeciesCard = ( {
  image,
  commonName,
  scientificName,
  id,
  toggleSpeciesModal,
  updateTaxon
}: Props ) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      if ( id ) {
        updateTaxon( id, commonName, scientificName );
        toggleSpeciesModal();
      } else {
        toggleSpeciesModal();
      }
    }}
  >
    <Image style={styles.roundImage} source={{ uri: image }} />
    <View style={styles.speciesNameContainer}>
      <Text style={styles.commonNameText}>{commonName || i18n.t( "posting.unknown" )}</Text>
      {scientificName ? <Text style={styles.scientificNameText}>{scientificName}</Text> : null}
    </View>
  </TouchableOpacity>
);

export default SpeciesCard;
