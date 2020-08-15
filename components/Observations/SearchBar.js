
// @flow
import React from "react";
import { View, TextInput, Image } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations/searchBar";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";

type Props = {
  fetchFilteredObservations: Function,
  searchText: string
}

const SearchBar = ( { fetchFilteredObservations, searchText }: Props ) => (
  <View style={[styles.row, styles.margins]}>
    <Image source={posting.searchGreen} style={styles.search} />
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
