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
  +iconicTaxonId?: ?number,
  +commonName: ?string,
  +scientificName: string,
  +allowFontScaling?: boolean
}

const SpeciesCard = ( {
  handlePress,
  photo,
  iconicTaxonId,
  commonName,
  scientificName,
  allowFontScaling
}: Props ) => (
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
        {( commonName || scientificName )
          ? commonName || scientificName
          : i18n.t( "posting.unknown" )}
      </Text>
      {scientificName && (
        <Text allowFontScaling={allowFontScaling} style={styles.scientificNameText}>
          {scientificName}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

SpeciesCard.defaultProps = {
  iconicTaxonId: null,
  handlePress: null,
  allowFontScaling: true
};

export default SpeciesCard;
