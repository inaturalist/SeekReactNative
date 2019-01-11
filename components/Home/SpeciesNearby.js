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
      <View style={{ flexGrow: 1 }}>
        <LoadingWheel color={colors.black} />
      </View>
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
              onPress={ () => navigation.push( "Species", {
                id: item.id,
                latitude,
                longitude,
                location,
                seen: false,
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.locationPicker}
            onPress={() => toggleLocationPicker()}
          >
            <Image source={icons.locationWhite} style={styles.image} />
            <Text style={styles.locationText}>
              {location}
            </Text>
            <Image source={icons.edit} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TaxonPicker updateTaxaType={updateTaxaType} />
          <Image source={icons.caret} />
        </View>
      </View>
      <View style={[styles.speciesNearbyContainer, error && { backgroundColor: "#4a4a4a", paddingTop: 32, paddingBottom: 32 }]}>
        {species}
      </View>
    </View>
  );
};

export default SpeciesNearby;
