// @flow

import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/speciesError";
import icons from "../../assets/icons";

type Props = {
  +seenTaxa: any,
  +checkForInternet: Function
}

const SpeciesError = ( { seenTaxa, checkForInternet }: Props ): Node => (
  <View style={viewStyles.background}>
    <TouchableOpacity
      onPress={checkForInternet}
      style={[viewStyles.errorContainer, viewStyles.center, viewStyles.row]}
    >
      <Image source={icons.internet} />
      <Text style={textStyles.errorText}>{i18n.t( "species_detail.internet_error" )}</Text>
    </TouchableOpacity>
    {seenTaxa && <Text style={textStyles.text}>{i18n.t( "species_detail.species_saved" )}</Text>}
  </View>
);

export default SpeciesError;
