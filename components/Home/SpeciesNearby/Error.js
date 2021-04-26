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
import { viewStyles, textStyles } from "../../../styles/home/error";
import icons from "../../../assets/icons";
import backgrounds from "../../../assets/backgrounds";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";

type Props = {
  error: string,
  checkInternet: ( ) => void,
  checkLocation: ( ) => void,
  openLocationPicker: ( ) => void
}

const Error = ( {
  error,
  checkInternet,
  checkLocation,
  openLocationPicker
}: Props ): React.Node => {
  const handlePress = ( ) => {
    if ( error === "internet_error" ) {
      checkInternet( );
    } else if ( error ) {
      checkLocation( );
    }
  };

  const showButton = ( ) => (
    <View style={viewStyles.greenButton}>
      <GreenButton
        color={colors.seekGreen}
        handlePress={openLocationPicker}
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
        style={[viewStyles.background, viewStyles.center]}
      >
        <View style={viewStyles.row}>
          <Image source={error === "internet_error" ? icons.internet : icons.error} />
          <Text style={textStyles.text}>
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
