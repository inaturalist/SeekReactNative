// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";

import styles from "../../styles/uiComponents/speciesCard";
import iconicTaxa from "../../assets/iconicTaxa";
import i18n from "../../i18n";

type Props = {
  +handlePress: Function,
  +photo: Object,
  +iconicTaxonId?: ?number,
  +commonName: string,
  +scientificName: string
}

const SpeciesCard = ( {
  handlePress,
  photo,
  iconicTaxonId,
  commonName,
  scientificName
}: Props ) => (
  <TouchableOpacity
    onPress={() => handlePress()}
    style={[styles.touchableArea, styles.row]}
  >
    {iconicTaxonId ? (
      <ImageBackground
        imageStyle={styles.image}
        source={iconicTaxa[iconicTaxonId]}
        style={styles.image}
      >
        <Image source={photo} style={styles.image} />
      </ImageBackground>
    ) : <Image source={photo} style={styles.image} />}
    {commonName || scientificName ? (
      <View style={styles.speciesNameContainer}>
        <Text style={styles.commonNameText}>
          {commonName || scientificName}
        </Text>
        <Text style={styles.scientificNameText}>{scientificName}</Text>
      </View>
    ) : (
      <View style={styles.speciesNameContainer}>
        <Text style={styles.commonNameText}>
          {i18n.t( "posting.unknown" )}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

SpeciesCard.defaultProps = {
  iconicTaxonId: null
};

export default SpeciesCard;
