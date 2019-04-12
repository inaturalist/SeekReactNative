// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

import styles from "../../styles/menu/observations";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  navigation: any,
  item: Object
}


const ObservationCard = ( { navigation, item }: Props ) => {
  const { taxon } = item;
  const { defaultPhoto } = taxon;
  let photo;

  if ( defaultPhoto ) {
    if ( defaultPhoto.squareUrl ) {
      photo = { uri: defaultPhoto.squareUrl };
    } else if ( defaultPhoto.mediumUrl ) {
      photo = { uri: defaultPhoto.mediumUrl };
    } else if ( taxon.iconicTaxonId ) {
      photo = iconicTaxa[taxon.iconicTaxonId];
    }
  } else {
    photo = iconicTaxa[taxon.iconicTaxonId];
  }


  return (
    <TouchableOpacity
      style={styles.card}
      onPress={ () => navigation.navigate( "Species", {
        id: taxon.id,
        commonName: taxon.preferredCommonName,
        scientificName: taxon.name
      } )}
    >
      <Image style={styles.image} source={photo} />
      <View style={styles.speciesNameContainer}>
        <Text style={styles.commonNameText}>
          {taxon.preferredCommonName ? taxon.preferredCommonName : taxon.name}
        </Text>
        <Text style={styles.scientificNameText}>{taxon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ObservationCard;
