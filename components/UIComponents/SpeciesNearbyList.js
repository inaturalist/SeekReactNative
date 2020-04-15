import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import styles from "../../styles/uiComponents/speciesNearbyList";
import i18n from "../../i18n";
import { capitalizeNames, setSpeciesId, setRoute } from "../../utility/helpers";
import LoadingWheel from "./LoadingWheel";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  +taxa: Array,
  +fetchiNatData: ?Function,
  +match: boolean
}

const SpeciesNearbyList = ( {
  taxa,
  match,
  fetchiNatData
}: Props ) => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderSpeciesImage = ( item ) => {
    const photo = item.default_photo;
    const extraPhotos = item.taxonPhotos || item.taxon_photos;
    let uri;

    if ( photo.medium_url && photo.license_code ) {
      uri = photo.medium_url;
    } else if ( extraPhotos ) {
      const licensedPhoto = extraPhotos.find( p => p.photo.license_code );
      if ( licensedPhoto ) {
        uri = licensedPhoto.photo.medium_url;
      }
    }

    return (
      <Image
        source={{ uri }}
        style={styles.cellImage}
      />
    );
  };

  return (
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
              setRoute( "Home" );
              navigation.navigate( "Species", { ...route.params } );
            }
          }}
          style={styles.gridCell}
        >
          <ImageBackground
            source={iconicTaxa[item.iconic_taxon_id]}
            style={styles.cellImage}
            imageStyle={styles.cellImage}
          >
            {item.default_photo && renderSpeciesImage( item )}
          </ImageBackground>
          <View style={styles.cellTitle}>
            <Text numberOfLines={3} style={styles.cellTitleText}>
              {capitalizeNames( item.preferred_common_name || item.name )}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default SpeciesNearbyList;
