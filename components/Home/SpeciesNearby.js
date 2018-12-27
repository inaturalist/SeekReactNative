import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import i18n from "../../i18n";
import styles from "../../styles/speciesNearby";
import { colors } from "../../styles/global";

const locationPin = ( <Icon name="location-pin" size={19} color={colors.white} /> );

const SpeciesNearby = () => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>
            {locationPin}
            {" "}
            Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.greenButton, styles.smallGreenButton]}>
          <Text style={styles.buttonText}>All species &#9660;</Text>
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView />
  </View>
);

export default SpeciesNearby;
