import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import { withNavigation } from "@react-navigation/compat";

import styles from "../../styles/uiComponents/speciesNearbyList";
import i18n from "../../i18n";
import { capitalizeNames, setSpeciesId, setRoute } from "../../utility/helpers";
import LoadingWheel from "./LoadingWheel";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  +taxa: Array,
  +navigation: any,
  +fetchiNatData: ?Function,
  +match: boolean,
  +route: any
}

const SpeciesNearbyList = ( {
  taxa,
  match,
  navigation,
  fetchiNatData,
  route
}: Props ) => (
  <FlatList
    alwaysBounceHorizontal
    bounces
    contentContainerStyle={styles.taxonList}
    data={taxa}
    getItemLayout={( data, index ) => (
      // skips measurement of dynamic content for faster loading
      {
        length: ( 28 + 108 ),
        offset: ( 28 + 108 ) * index,
        index
      }
    )}
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
      if ( fetchiNatData ) {
        return (
          <Text style={[styles.cellTitleText, styles.errorText, styles.noTaxon]}>
            {i18n.t( "species_detail.similar_no_species" )}
          </Text>
        );
      }
      return <LoadingWheel color="black" />;
    }}
    renderItem={( { item } ) => (
      <TouchableOpacity
        onPress={() => {
          setSpeciesId( item.id );
          if ( match ) {
            setRoute( "Match" );
            navigation.navigate( "Species", { ...route.params } );
          } else if ( fetchiNatData ) {
            fetchiNatData();
          } else {
            setRoute( "Main" );
            navigation.navigate( "Species", { ...route.params } );
          }
        }}
        style={styles.gridCell}
      >
        {item.default_photo && item.default_photo.medium_url ? (
          <Image
            source={{ uri: item.default_photo.medium_url }}
            style={styles.cellImage}
          />
        ) : (
          <Image
            source={iconicTaxa[item.iconic_taxon_id]}
            style={styles.cellImage}
          />
        )}
        <View style={styles.cellTitle}>
          <Text numberOfLines={3} style={styles.cellTitleText}>
            {capitalizeNames( item.preferred_common_name || item.name )}
          </Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

export default withNavigation( SpeciesNearbyList );
