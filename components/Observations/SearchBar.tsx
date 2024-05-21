import React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/observations/searchBar";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";
import icons from "../../assets/icons";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  fetchFilteredObservations: ( searchText: string ) => void;
  searchText: string;
  clearText: () => void;
}

const SearchBar = ( { fetchFilteredObservations, searchText, clearText }: Props ) => (
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
      style={[baseTextStyles.inputField, textStyles.inputField]}
      defaultValue={searchText}
    />
  </View>
);

export default SearchBar;
