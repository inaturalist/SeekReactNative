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
  +handlePress?: Function,
  +photo: Object,
  +allowFontScaling?: boolean,
  +taxon: Object
}

const SpeciesCard = ( {
  handlePress,
  photo,
  allowFontScaling,
  taxon
}: Props ) => {
  const { preferredCommonName, name, iconicTaxonId } = taxon;

  return (
    <TouchableOpacity
      onPress={() => {
        if ( handlePress ) {
          handlePress();
        }
      }}
      style={[!handlePress ? styles.notTouchable : styles.touchableArea, styles.row]}
      disabled={!handlePress}
    >
      {iconicTaxonId ? (
        <ImageBackground
          imageStyle={styles.image}
          source={iconicTaxa[iconicTaxonId] || iconicTaxa[1]}
          style={styles.image}
        >
          <Image source={photo} style={styles.image} />
        </ImageBackground>
      ) : <Image source={photo} style={styles.image} />}
      <View style={styles.speciesNameContainer}>
        <Text allowFontScaling={allowFontScaling} style={styles.commonNameText}>
          {( preferredCommonName || name )
            ? preferredCommonName || name
            : i18n.t( "posting.unknown" )}
        </Text>
        {name && (
          <Text allowFontScaling={allowFontScaling} style={styles.scientificNameText}>
            {name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

SpeciesCard.defaultProps = {
  iconicTaxonId: null,
  handlePress: null,
  allowFontScaling: true
};

export default SpeciesCard;
