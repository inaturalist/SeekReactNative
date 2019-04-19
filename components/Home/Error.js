// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import OpenSettings from "react-native-open-settings";

import i18n from "../../i18n";
import styles from "../../styles/home/error";
import icons from "../../assets/icons";
import backgrounds from "../../assets/backgrounds";

type Props = {
  error: string,
  setParamsForSpeciesNearby: Function,
  latitude: string,
  longitude: string
}

const Error = ( {
  error,
  setParamsForSpeciesNearby,
  latitude,
  longitude
}: Props ) => (
  <ImageBackground style={styles.background} source={backgrounds.noSpeciesNearby}>
    { error === "location" ? (
      <View style={styles.row}>
        <Image source={icons.error} />
        <Text style={styles.text}>{i18n.t( "species_nearby.location_error" )}</Text>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => setParamsForSpeciesNearby( latitude, longitude )}
      >
        <View style={styles.row}>
          <Image source={icons.internet} />
          <Text style={styles.text}>{i18n.t( "species_nearby.internet_error" )}</Text>
        </View>
      </TouchableOpacity>
    )}
    { error === "location" ? (
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => OpenSettings.openSettings()}
      >
        <Text style={styles.buttonText}>{i18n.t( "species_nearby.enable_location" ).toLocaleUpperCase()}</Text>
      </TouchableOpacity>
    ) : null}
  </ImageBackground>
);

export default Error;
