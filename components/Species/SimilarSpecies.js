import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import i18n from "../../i18n";
import { fonts, colors } from "../../styles/global";
import styles from "../../styles/home/speciesNearby";
import { capitalizeNames } from "../../utility/helpers";
import LoadingWheel from "../LoadingWheel";
import logos from "../../assets/logos";

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
      <LoadingWheel color="black" />
    );
  } else if ( taxa.length > 0 ) {
    species = (
      <FlatList
        contentContainerStyle={styles.similarSpeciesList}
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
                commonName: capitalizeNames( item.preferred_common_name || item.name ),
                scientificName: item.name
              } ) }
            >
              { item.default_photo ? (
                <Image
                  style={styles.cellImage}
                  source={{ uri: item.default_photo.medium_url }}
                />
              ) : (
                <Image
                  style={styles.cellImage}
                  source={logos.bird}
                />
              )}
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
    <View>
      <Text style={{
        marginTop: 45,
        marginLeft: 28,
        marginBottom: 11,
        fontSize: 19,
        fontFamily: fonts.semibold,
        color: colors.seekForestGreen,
        letterSpacing: 1.12
      }}
      >
        {i18n.t( "species_detail.similar" ).toLocaleUpperCase()}
      </Text>
      <View style={[
        styles.similarSpeciesContainer,
        loading && styles.loading
      ]}
      >
        {species}
      </View>
    </View>
  );
};

export default SimilarSpecies;
