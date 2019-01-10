// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import OpenSettings from "react-native-open-settings";

import i18n from "../../i18n";
import styles from "../../styles/home/error";
import icons from "../../assets/icons";

type Props = {
  error: string
}

const Error = ( { error }: Props ) => (
  <View style={styles.textContainer}>
    { error === "location" ? (
      <View style={styles.row}>
        <Image source={icons.error} />
        <Text style={styles.text}>{i18n.t( "species_nearby.location_error" )}</Text>
      </View>
    ) : (
      <View style={styles.row}>
        <Image source={icons.internet} />
        <Text style={styles.text}>{i18n.t( "species_nearby.internet_error" )}</Text>
      </View>
    )}
    { error === "location" ? (
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => OpenSettings.openSettings()}
      >
        <Text style={styles.buttonText}>{i18n.t( "species_nearby.enable_location" ).toLocaleUpperCase()}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

export default Error;
