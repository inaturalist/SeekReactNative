import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import styles from "../../styles/home/speciesNearby";
import { capitalizeNames } from "../../utility/helpers";
import { colors } from "../../styles/global";

type Props = {
  taxa: Array,
  navigation: any
}

const SimilarSpecies = ( {
  taxa,
  navigation
}: Props ) => {
  let species;

  if ( taxa.length > 0 ) {
    species = (
      <FlatList
        contentContainerStyle={styles.taxonList}
        data={taxa}
        keyExtractor={taxon => `species-${taxon.id}`}
        horizontal
        bounces
        alwaysBounceHorizontal
        renderItem={ ( { item } ) => (
          <View style={styles.gridCell}>
            <TouchableOpacity
              onPress={ () => navigation.push( "Species", {
                id: item.id,
                commonName: capitalizeNames( item.preferred_common_name ),
                scientificName: item.name
              } ) }
            >
              <Image
                style={styles.cellImage}
                source={{ uri: item.default_photo.medium_url }}
              />
              <View style={styles.cellTitle}>
                <Text numberOfLines={3} style={styles.cellTitleText}>
                  {capitalizeNames( item.preferred_common_name || item.name )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }

  return (
    <View style={[styles.speciesNearbyContainer, {
      backgroundColor: colors.seekForestGreen,
      paddingTop: 20
    }]}>
      {species}
    </View>
  );
};

export default SimilarSpecies;
