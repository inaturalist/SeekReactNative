// @flow

import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  map: {
    height: 189,
    width: width - 56
  },
  mapContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  margin: {
    marginTop: 20
  },
  smallMargins: {
    marginTop: 25
  }
} );
