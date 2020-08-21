
// @flow
import React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations/searchBar";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";
import icons from "../../assets/icons";

type Props = {
  fetchFilteredObservations: Function,
  searchText: string,
  clearText: Function
}

const SearchBar = ( { fetchFilteredObservations, searchText, clearText }: Props ) => (
  <View style={[styles.row, styles.margins]}>
    <Image source={posting.searchGreen} style={styles.search} />
    {searchText.length > 0 && (
      <TouchableOpacity
        onPress={clearText}
        style={styles.top}
      >
        <Image
          source={icons.closeGray}
          style={styles.clear}
        />
      </TouchableOpacity>
    )}
    <TextInput
      onChangeText={fetchFilteredObservations}
      placeholder={i18n.t( "observations.search" )}
      placeholderTextColor={colors.placeholderGray}
      style={styles.inputField}
      value={searchText}
    />
  </View>
);

export default SearchBar;
