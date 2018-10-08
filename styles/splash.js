import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
    resizeMode: "cover"
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    marginBottom: 25
  }
} );
