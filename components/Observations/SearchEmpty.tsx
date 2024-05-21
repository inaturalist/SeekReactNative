import React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/observations/searchEmpty";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  clearText: ( ) => void;
}

const SearchEmpty = ( { clearText }: Props ) => (
  <View style={viewStyles.container}>
    <StyledText style={[baseTextStyles.emptyState, textStyles.headerText]}>
      {i18n.t( "observations.search_empty" )}
    </StyledText>
    <View style={viewStyles.margin} />
    <GreenButton
      handlePress={clearText}
      text="observations.reset_search"
    />
  </View>
);

export default SearchEmpty;
