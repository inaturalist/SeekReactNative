import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import icons from "../../assets/icons";
import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/species/speciesError";
import { baseTextStyles } from "../../styles/textStyles";
import StyledText from "../UIComponents/StyledText";

interface Props {
  readonly seenTaxa: object | null;
  readonly checkForInternet: () => void;
}

const SpeciesError = ( { seenTaxa, checkForInternet }: Props ) => (
  <View style={viewStyles.background}>
    <TouchableOpacity
      onPress={checkForInternet}
      style={[viewStyles.errorContainer, viewStyles.center, viewStyles.row]}
    >
      <Image source={icons.internet} />
      <StyledText style={[baseTextStyles.bodyWhite, textStyles.errorText]}>{i18n.t( "species_detail.internet_error" )}</StyledText>
    </TouchableOpacity>
    {seenTaxa && <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "species_detail.species_saved" )}</StyledText>}
  </View>
);

export default SpeciesError;
