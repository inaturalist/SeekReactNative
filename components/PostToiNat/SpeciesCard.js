// @flow

import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/posting/selectSpecies";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  image: string,
  commonName: string,
  scientificName: string,
  id: Number,
  updateTaxon: Function,
  toggleSpeciesModal: Function,
  iconicTaxonId: Number
};

const SpeciesCard = ( {
  image,
  commonName,
  scientificName,
  id,
  toggleSpeciesModal,
  updateTaxon,
  iconicTaxonId
}: Props ) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      updateTaxon( id, commonName, scientificName );
      toggleSpeciesModal();
    }}
  >
    {image
      ? <Image style={styles.roundImage} source={{ uri: image }} />
      : <Image style={styles.roundImage} source={iconicTaxa[iconicTaxonId]} />
    }
    <View style={styles.speciesNameContainer}>
      <Text style={styles.commonNameText}>{commonName || i18n.t( "posting.unknown" )}</Text>
      {scientificName ? <Text style={styles.scientificNameText}>{scientificName}</Text> : null}
    </View>
  </TouchableOpacity>
);

export default SpeciesCard;
