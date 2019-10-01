import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import styles from "../../styles/home/speciesNearby";
import i18n from "../../i18n";
import { capitalizeNames, setSpeciesId, setRoute } from "../../utility/helpers";
import LoadingWheel from "../LoadingWheel";

type Props = {
  +taxa: Array,
  +navigation: ?any,
  +fetchiNatData: ?Function
}

const SpeciesNearbyList = ( { taxa, navigation, fetchiNatData }: Props ) => (
  <FlatList
    alwaysBounceHorizontal
    bounces
    contentContainerStyle={styles.taxonList}
    data={taxa}
    horizontal
    initialNumToRender={3}
    keyExtractor={taxon => `species-${taxon.id}`}
    ListEmptyComponent={() => {
      if ( navigation ) {
        return (
          <Text style={[styles.cellTitleText, styles.noTaxon]}>
            {i18n.t( "species_nearby.no_species" )}
          </Text>
        );
      }
      return <LoadingWheel color="black" />;
    }}
    renderItem={ ( { item } ) => (
      <TouchableOpacity
        onPress={ () => {
          setSpeciesId( item.id );
          if ( navigation ) {
            setRoute( "Main" );
            navigation.navigate( "Species" );
          } else {
            fetchiNatData();
          }
        }}
        style={styles.gridCell}
      >
        <Image
          source={{ uri: item.default_photo.medium_url }}
          style={styles.cellImage}
        />
        <View style={styles.cellTitle}>
          <Text numberOfLines={3} style={styles.cellTitleText}>
            {capitalizeNames( item.preferred_common_name || item.name )}
          </Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

export default SpeciesNearbyList;
