import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  headerMargins: {
    marginBottom: 11,
    marginTop: 45
  },
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
  }
} );
