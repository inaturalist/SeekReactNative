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

type Props = {
  +handlePress: Function,
  +photo: Object,
  +iconicTaxonId: ?Number,
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
    <View style={styles.speciesNameContainer}>
      <Text style={styles.commonNameText}>
        {commonName || scientificName}
      </Text>
      <Text style={styles.scientificNameText}>{scientificName}</Text>
    </View>
  </TouchableOpacity>
);

export default SpeciesCard;
