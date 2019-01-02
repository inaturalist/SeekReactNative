import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import { colors } from "../../styles/global";
import LoadingWheel from "../LoadingWheel";
import TaxonPicker from "./TaxonPicker";
import { capitalizeNames } from "../../utility/helpers";

const locationPin = ( <Icon name="location-pin" size={19} color={colors.white} /> );

type Props = {
  taxa: Array,
  loading: boolean,
  navigation: any,
  location: string,
  taxaType: string,
  latitude: number,
  longitude: number,
  updateTaxaType: Function
}

const SpeciesNearby = ( {
  taxa,
  loading,
  navigation,
  location,
  latitude,
  longitude,
  taxaType,
  updateTaxaType
}: Props ) => {
  let species;

  if ( loading ) {
    species = <LoadingWheel />;
  } else if ( taxa.length > 0 ) {
    species = (
      <FlatList
        style={styles.taxonContainer}
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
                <Text numberOfLines={2} style={styles.cellTitleText}>
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
      <View style={styles.column}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={styles.speciesContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => navigation.push( "Location", {
                taxaType,
                longitude,
                latitude,
                location
              } )}
            >
              <Text style={styles.buttonText}>
                {locationPin}
                {" "}
                {location}
              </Text>
            </TouchableOpacity>
            <TaxonPicker updateTaxaType={updateTaxaType} />
          </View>
          {species}
        </View>
      </View>
    </View>
  );
};

export default SpeciesNearby;
