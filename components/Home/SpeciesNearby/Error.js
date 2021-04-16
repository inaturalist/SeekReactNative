// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

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
  const handlePress = ( ) => {
    if ( error === "internet_error" ) {
      checkInternet( );
    } else if ( error ) {
      checkLocation( );
    }
  };

  const openMap = ( ) => console.log( "open map" );

  const showButton = ( ) => (
    <View style={styles.greenButton}>
      <GreenButton
        color={colors.seekGreen}
        handlePress={openMap}
        text="species_nearby.choose_location_on_map"
      />
    </View>
  );

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
        {error === "species_nearby_requires_location" && showButton( )}
      </ImageBackground>
    </TouchableOpacity>
    );
};

export default Error;
