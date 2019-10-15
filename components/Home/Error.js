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
  +error: string,
  +handleClick: Function
}

const Error = ( {
  error,
  handleClick
}: Props ) => {
  let text;

  if ( error === "location_device" ) {
    text = i18n.t( "species_nearby.location_device" );
  } else if ( error === "no_gps" ) {
    text = i18n.t( "species_nearby.no_gps" );
  } else if ( error === "location_timeout" ) {
    text = i18n.t( "species_nearby.location_timeout" );
  } else if ( error === "location" ) {
    text = i18n.t( "species_nearby.location_error" );
  } else if ( error === "internet" ) {
    text = i18n.t( "species_nearby.internet_error" );
  } else if ( error === "tap" ) {
    text = i18n.t( "results.tap" );
  }

  return (
    <ImageBackground
      source={backgrounds.noSpeciesNearby}
      style={[styles.background, styles.center]}
    >
      <TouchableOpacity
        onPress={() => handleClick()}
      >
        <View style={styles.row}>
          <Image source={error === "internet" ? icons.internet : icons.error} />
          <Text style={styles.text}>{text}</Text>
        </View>
        {error === "location" ? (
          <TouchableOpacity
            onPress={() => OpenSettings.openSettings()}
            style={styles.greenButton}
          >
            <Text style={styles.buttonText}>
              {i18n.t( "species_nearby.enable_location" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Error;
