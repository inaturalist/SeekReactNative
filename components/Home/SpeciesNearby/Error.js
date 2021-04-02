// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform
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
  +checkInternet: Function,
  +checkLocation: Function
}

const Error = ( {
  error,
  checkInternet,
  checkLocation
}: Props ): React.Node => {
  const handlePress = () => {
    if ( error === "internet_error" ) {
      checkInternet();
    } else if ( error ) {
      checkLocation();
    }
  };

  const openSettings = () => OpenSettings.openSettings();

  const showPermissionsButton = () => {
    if ( Platform.OS === "android" ) {
      return (
        <View style={styles.greenButton}>
          <GreenButton
            color={colors.seekGreen}
            handlePress={openSettings}
            text="species_nearby.enable_location"
          />
        </View>
      );
    }
    return (
      <View style={styles.greenButton}>
        <Text style={styles.whiteText}>
          {i18n.t( "species_nearby.please_enable_location" ).toLocaleUpperCase()}
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={error === "downtime"}
    >
      <ImageBackground
        source={backgrounds.noSpeciesNearby}
        style={[styles.background, styles.center]}
      >
        <View style={styles.row}>
          <Image source={error === "internet_error" ? icons.internet : icons.error} />
          <Text style={styles.text}>
            {error === "downtime"
              ? i18n.t( "results.error_downtime_plural", { count: i18n.t( "results.error_few" ) } )
              : i18n.t( `species_nearby.${error}` )}
          </Text>
        </View>
        {error === "location_error" && showPermissionsButton()}
      </ImageBackground>
    </TouchableOpacity>
    );
};

export default Error;
