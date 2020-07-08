import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  card: {
    paddingHorizontal: 24
  },
  deleteButton: {
    justifyContent: "center",
    marginLeft: width - 327 + 1, // width - touchable area of species card
    width: 72
  }
} );
