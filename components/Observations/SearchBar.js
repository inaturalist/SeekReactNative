
// @flow
import * as React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/observations/searchBar";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";
import icons from "../../assets/icons";

type Props = {
  fetchFilteredObservations: Function,
  searchText: string,
  clearText: Function
}

const SearchBar = ( { fetchFilteredObservations, searchText, clearText }: Props ): React.Node => (
  <View style={[viewStyles.row, viewStyles.margins]}>
    <Image source={posting.searchGreen} style={imageStyles.search} />
    {searchText.length > 0 && (
      <TouchableOpacity
        onPress={clearText}
        style={viewStyles.top}
      >
        <Image
          source={icons.closeGray}
          style={imageStyles.clear}
        />
      </TouchableOpacity>
    )}
    <TextInput
      onChangeText={fetchFilteredObservations}
      placeholder={i18n.t( "observations.search" )}
      placeholderTextColor={colors.placeholderGray}
      style={textStyles.inputField}
      defaultValue={searchText}
    />
  </View>
);

export default SearchBar;
