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
import LoadingWheel from "../LoadingWheel";

type Props = {
  taxa: Array,
  navigation: any,
  loading: boolean
}

const SimilarSpecies = ( {
  taxa,
  navigation,
  loading
}: Props ) => {
  let species;

  if ( loading ) {
    species = (
      <LoadingWheel color={colors.black} />
    );
  } else if ( taxa.length > 0 ) {
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
    <View style={{
      backgroundColor: colors.seekForestGreen,
      height: 220,
      alignItems: "center",
      justifyContent: "center"
    }}
    >
      {species}
    </View>
  );
};

export default SimilarSpecies;
