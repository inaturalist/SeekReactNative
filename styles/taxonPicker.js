import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "15%"
  },
  headerText: {
    marginTop: "15%",
    fontSize: 20,
    lineHeight: 18,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  gridContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  imageCell: {
    width: width / 3 - 2,
    height: width / 3 - 2
  },
  image: {
    backgroundColor: "#37535e",
    width: "80%",
    height: "80%"
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }
} );
