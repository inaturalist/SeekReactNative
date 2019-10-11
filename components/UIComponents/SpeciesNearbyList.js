import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import styles from "../../styles/uiComponents/speciesNearbyList";
import i18n from "../../i18n";
import { capitalizeNames, setSpeciesId, setRoute, setDrawer } from "../../utility/helpers";
import LoadingWheel from "./LoadingWheel";

type Props = {
  +taxa: Array,
  +navigation: ?any,
  +fetchiNatData: ?Function,
  +match: boolean
}

const SpeciesNearbyList = ( {
  taxa,
  match,
  navigation,
  fetchiNatData
}: Props ) => (
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
          <Text style={[styles.cellTitleText, styles.errorText, styles.noTaxon]}>
            {match ? i18n.t( "results.nothing_nearby" ) : i18n.t( "species_nearby.no_species" )}
          </Text>
        );
      }
      return <LoadingWheel color="black" />;
    }}
    renderItem={ ( { item } ) => (
      <TouchableOpacity
        onPress={ () => {
          setSpeciesId( item.id );
          if ( match ) {
            setRoute( "Match" );
            navigation.navigate( "Species", { ...navigation.state.params } );
          } else if ( navigation ) {
            setDrawer( "Species" );
            setRoute( "Main" );
            navigation.navigate( "Species", { ...navigation.state.params } );
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
