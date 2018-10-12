import { StyleSheet } from "react-native";

export default StyleSheet.create( {
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
