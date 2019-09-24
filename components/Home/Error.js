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
  requestAndroidPermissions: Function
}

const Error = ( {
  error,
  requestAndroidPermissions
}: Props ) => (
  <ImageBackground style={styles.background} source={backgrounds.noSpeciesNearby}>
    <TouchableOpacity
      onPress={() => requestAndroidPermissions()}
    >
      {error === "location_device" ? (
        <View style={styles.row}>
          <Image source={icons.error} />
          <Text style={styles.text}>{i18n.t( "species_nearby.location_device" )}</Text>
        </View>
      ) : null}
      {error === "no_gps" ? (
        <View style={styles.row}>
          <Image source={icons.error} />
          <Text style={styles.text}>{i18n.t( "species_nearby.no_gps" )}</Text>
        </View>
      ) : null}
      {error === "location_timeout" ? (
        <View style={styles.row}>
          <Image source={icons.error} />
          <Text style={styles.text}>{i18n.t( "species_nearby.location_timeout" )}</Text>
        </View>
      ) : null}
      {error === "location" ? (
        <View style={styles.row}>
          <Image source={icons.error} />
          <Text style={styles.text}>{i18n.t( "species_nearby.location_error" )}</Text>
        </View>
      ) : null}
      {error === "internet" ? (
        <View style={styles.row}>
          <Image source={icons.internet} />
          <Text style={styles.text}>{i18n.t( "species_nearby.internet_error" )}</Text>
        </View>
      ) : null}
      {error === "location" ? (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => OpenSettings.openSettings()}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "species_nearby.enable_location" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  </ImageBackground>
);

export default Error;
