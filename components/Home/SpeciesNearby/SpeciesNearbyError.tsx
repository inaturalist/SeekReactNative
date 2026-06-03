import { useNetInfo } from "@react-native-community/netinfo";
import * as React from "react";
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

import backgrounds from "../../../assets/backgrounds";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import { textStyles, viewStyles } from "../../../styles/home/error";
import { baseTextStyles } from "../../../styles/textStyles";
import { useSpeciesNearby } from "../../Providers/SpeciesNearbyProvider";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import StyledText from "../../UIComponents/StyledText";

interface Props {
  error: string;
  checkInternet: ( ) => void;
  checkLocation: ( ) => void;
  openLocationPicker: ( ) => void;
}

const SpeciesNearbyError = ( {
  error,
  checkInternet,
  checkLocation,
  openLocationPicker,
}: Props ) => {
  const { speciesNearby, setSpeciesNearby } = useSpeciesNearby( );
  const netInfo = useNetInfo( );
  const { isConnected } = netInfo;

  const handlePress = ( ) => {
    if ( error === "internet_error" && isConnected ) {
      setSpeciesNearby( {
        ...speciesNearby,
        isConnected,
      } );
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
          <StyledText style={[baseTextStyles.bodyWhite, textStyles.text]}>
            {error === "downtime"
              ? i18n.t( "results.error_downtime_plural", { count: i18n.t( "results.error_few" ) } )
              : i18n.t( `species_nearby.${error}` )}
          </StyledText>
        </View>
        {error === "species_nearby_requires_location" && showButton( )}
      </ImageBackground>
    </TouchableOpacity>
    );
};

export default SpeciesNearbyError;
