import * as React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/uiComponents/speciesNearby/emptyList";
import i18n from "../../../i18n";
import StyledText from "../StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

const EmptyList = ( ) => {
  const { name } = useRoute( );

  let text = null;

  if ( name === "Species" ) {
    text = i18n.t( "species_detail.similar_no_species" );
  } else if ( name === "Home" ) {
    text = i18n.t( "species_nearby.no_species" );
  } else {
    text = i18n.t( "results.nothing_nearby" );
  }

  return (
    <View style={viewStyles.noTaxon}>
      <StyledText style={[baseTextStyles.bodyWhite, textStyles.cellTitleText]}>
        {text}
      </StyledText>
    </View>
  );
};

export default EmptyList;
