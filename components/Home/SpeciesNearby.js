import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import { colors } from "../../styles/global";
import LoadingWheel from "../LoadingWheel";
import TaxonPicker from "./TaxonPicker";
import { capitalizeNames } from "../../utility/helpers";

const locationPin = ( <Icon name="location-on" size={19} color={colors.white} /> );

type Props = {
  taxa: Array,
  loading: boolean,
  navigation: any,
  location: string,
  latitude: number,
  longitude: number,
  updateTaxaType: Function,
  toggleLocationPicker: Function
}

const SpeciesNearby = ( {
  taxa,
  loading,
  navigation,
  location,
  latitude,
  longitude,
  updateTaxaType,
  toggleLocationPicker
}: Props ) => {
  let species;

  if ( loading ) {
    species = <LoadingWheel />;
  } else if ( taxa.length > 0 ) {
    species = (
      <FlatList
        style={styles.taxonList}
        data={taxa}
        keyExtractor={taxon => `species-${taxon.id}`}
        horizontal
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
  } else {
    species = (
      <View style={styles.textContainer}>
        <Text>{i18n.t( "species_nearby.error" )}</Text>
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
      <View style={styles.buttons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.locationPicker}
            onPress={() => toggleLocationPicker()}
          >
            <Text style={styles.locationText}>
              {locationPin}
              {" "}
            </Text>
            <Text style={styles.locationText}>
              {location}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TaxonPicker updateTaxaType={updateTaxaType} />
        </View>
      </View>
      <View style={styles.speciesNearbyContainer}>
        {species}
      </View>
    </View>
  );
};

export default SpeciesNearby;
