// @flow

import * as React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/observations/searchEmpty";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import StyledText from "../UIComponents/StyledText";

type Props = {
  clearText: Function
};

const SearchEmpty = ( { clearText }: Props ): React.Node => (
  <View style={viewStyles.container}>
    <StyledText style={textStyles.headerText}>
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
