import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  card: {
    marginBottom: 18,
    marginHorizontal: 24
  },
  deleteButton: {
    justifyContent: "center",
    marginLeft: width - 327 + 1, // width - touchable area of species card
    marginRight: 25,
    width: 72
  }
} );
