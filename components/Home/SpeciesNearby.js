import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Picker,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import { colors } from "../../styles/global";
import LoadingWheel from "../LoadingWheel";
import { capitalizeNames } from "../../utility/helpers";

const locationPin = ( <Icon name="location-pin" size={19} color={colors.white} /> );

type Props = {
  taxa: Array,
  loading: boolean
}

const SpeciesNearby = ( { taxa, loading }: Props ) => {
  let species;

  console.log( loading, taxa, "props in species nearby" );

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
              onPress={() => console.log( "pressed button" )}
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
            <TouchableOpacity style={styles.greenButton}>
              <Text style={styles.buttonText}>
                {locationPin}
                {" "}
                Location
              </Text>
            </TouchableOpacity>
            <Picker
              style={[styles.greenButton, styles.smallGreenButton]}
              itemStyle={styles.buttonText}
              mode="dropdown"
              prompt="All species &#9660;"
            >
              <Picker.Item label="All species &#9660;" value="all" />
              <Picker.Item label="Reptiles &#9660;" value="reptiles" />
            </Picker>
          </View>
          {species}
        </View>
      </View>
    </View>
  );
};

export default SpeciesNearby;
