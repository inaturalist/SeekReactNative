// @flow

import React from "react";
import { View, Text } from "react-native";

import styles from "../../styles/home/locationPicker";
import i18n from "../../i18n";

const AndroidMapError = ( ) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{i18n.t( "location_picker.map_error_android" ).toLocaleUpperCase( )}</Text>
  </View>
);

export default AndroidMapError;
