import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    height
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 100,
    margin: 10
  }
} );
