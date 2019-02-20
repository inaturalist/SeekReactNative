import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: width - 56,
    height: 189
  }
} );
