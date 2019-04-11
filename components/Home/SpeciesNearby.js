import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import LoadingWheel from "../LoadingWheel";
import Error from "./Error";
import TaxonPicker from "./TaxonPicker";
import { capitalizeNames } from "../../utility/helpers";
import icons from "../../assets/icons";
import { colors } from "../../styles/global";
import logos from "../../assets/logos";

type Props = {
  taxa: Array,
  loading: boolean,
  navigation: any,
  location: string,
  latitude: number,
  longitude: number,
  updateTaxaType: Function,
  toggleLocationPicker: Function,
  checkRealmForSpecies: Function,
  error: string
}

const SpeciesNearby = ( {
  taxa,
  loading,
  navigation,
  location,
  latitude,
  longitude,
  updateTaxaType,
  toggleLocationPicker,
  checkRealmForSpecies,
  error
}: Props ) => {
  let species;

  if ( loading ) {
    species = (
      <LoadingWheel color={colors.black} />
    );
  } else if ( error ) {
    species = (
      <Error
        error={error}
        checkRealmForSpecies={checkRealmForSpecies}
        latitude={latitude}
        longitude={longitude}
      />
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
              onPress={ () => navigation.navigate( "Species", {
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
  } else {
    species = (
      <View style={styles.noTaxon}>
        <Text style={styles.cellTitleText}>{i18n.t( "species_nearby.no_species" )}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRow}
          onPress={() => toggleLocationPicker()}
        >
          <Image source={icons.locationWhite} style={styles.image} />
          <View style={styles.whiteButton}>
            {location
              ? <Text style={styles.buttonText}>{location.toLocaleUpperCase()}</Text>
              : null
            }
          </View>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <Image source={icons.filter} style={styles.image} />
          <TaxonPicker updateTaxaType={updateTaxaType} />
        </View>
      </View>
      <View style={[
        styles.speciesNearbyContainer,
        loading && styles.loading
      ]}
      >
        {species}
      </View>
    </View>
  );
};

export default SpeciesNearby;
