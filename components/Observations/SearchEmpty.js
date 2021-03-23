// @flow

import * as React from "react";
import { Text, View } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations/searchEmpty";
import GreenButton from "../UIComponents/Buttons/GreenButton";

type Props = {
  clearText: Function
};

const SearchEmpty = ( { clearText }: Props ): React.Node => (
  <View style={styles.container}>
    <Text style={styles.headerText}>
      {i18n.t( "observations.search_empty" )}
    </Text>
    <View style={styles.margin} />
    <GreenButton
      handlePress={clearText}
      text="observations.reset_search"
    />
  </View>
);

export default SearchEmpty;
