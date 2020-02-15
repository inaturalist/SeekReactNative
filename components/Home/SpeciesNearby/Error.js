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

import i18n from "../../../i18n";
import styles from "../../../styles/home/error";
import icons from "../../../assets/icons";
import backgrounds from "../../../assets/backgrounds";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";

type Props = {
  +error: string,
  +requestAndroidPermissions: Function
}

const Error = ( {
  error,
  requestAndroidPermissions
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
  }

  return (
    <ImageBackground
      source={backgrounds.noSpeciesNearby}
      style={[styles.background, styles.center]}
    >
      <TouchableOpacity
        onPress={() => requestAndroidPermissions()}
      >
        <View style={styles.row}>
          <Image source={error === "internet" ? icons.internet : icons.error} />
          <Text style={styles.text}>{text}</Text>
        </View>
        {error === "location" ? (
          <View style={styles.greenButton}>
            <GreenButton
              color={colors.seekGreen}
              handlePress={() => OpenSettings.openSettings()}
              text="species_nearby.enable_location"
            />
          </View>
        ) : null}
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Error;
