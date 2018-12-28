import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Picker
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Icon from "react-native-vector-icons/Entypo";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import { colors } from "../../styles/global";
import { capitalizeNames } from "../../utility/helpers";

const locationPin = ( <Icon name="location-pin" size={19} color={colors.white} /> );

type Props = {
  fetchTaxa: Function,
  taxa: Array
}

const SpeciesNearby = ( { fetchTaxa, taxa }: Props ) => (
  <View style={styles.container}>
    <NavigationEvents
      onWillFocus={() => fetchTaxa()}
    />
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
        { taxa.length > 0 ? (
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
            ) }
          />
        ) : (
          <View style={styles.textContainer}>
            <Text>{i18n.t( "species_nearby.error" )}</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

export default SpeciesNearby;
