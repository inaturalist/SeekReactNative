// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

import styles from "../../styles/menu/observations";
import { setSpeciesId } from "../../utility/helpers";

type Props = {
  navigation: any,
  item: Object
}


const ObservationCard = ( { navigation, item }: Props ) => {
  let photoUri;

  if ( item.taxon.defaultPhoto.squareUrl ) {
    photoUri = item.taxon.defaultPhoto.squareUrl;
  } else {
    photoUri = item.taxon.defaultPhoto.mediumUrl;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={ () => {
        setSpeciesId( item.taxon.id );
        navigation.navigate( "Species" );
      }}
    >
      <Image style={styles.image} source={{ uri: photoUri }} />
      <View style={styles.speciesNameContainer}>
        <Text style={styles.commonNameText}>
          {item.taxon.preferredCommonName}
        </Text>
        <Text style={styles.scientificNameText}>{item.taxon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ObservationCard;
