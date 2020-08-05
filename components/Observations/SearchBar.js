
// @flow
import React from "react";
import { View, TextInput, Image } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations/searchBar";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";

type Props = {
  fetchFilteredObservations: Function
}

const SearchBar = ( { fetchFilteredObservations }: Props ) => (
  <View style={[styles.row, styles.margins]}>
    <Image
      source={posting.searchGreen}
      // tintColor={colors.white}
      style={styles.search}
    />
    <TextInput
      onChangeText={text => fetchFilteredObservations( text )}
      placeholder={i18n.t( "observations.search" )}
      placeholderTextColor={colors.placeholderGray}
      style={styles.inputField}
    />
  </View>
);

export default SearchBar;
