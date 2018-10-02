import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    alignItems: "center",
    backgroundColor: "transparent"
  },
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
    resizeMode: "cover"
  },
  disclaimer: {
    fontSize: 14,
    marginHorizontal: 50,
    marginBottom: 150,
    marginRight: 70,
    lineHeight: 12,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    flex: 2
  },
  tips: {
    fontSize: 16,
    lineHeight: 14,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    flexWrap: "wrap"
  },
  checkMark: {
    fontSize: 24,
    color: "#b3ff5a",
    fontFamily: "FontAwesome",
    marginRight: 15
  },
  tipList: {
    marginHorizontal: 50,
    marginBottom: 18,
    flexDirection: "row",
    marginRight: 108,
    flex: 1
  },
  earn: {
    fontSize: 20,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 15,
    lineHeight: 18,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  welcome: {
    fontSize: 36,
    textAlign: "center",
    marginTop: 60,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  button: {
    backgroundColor: "white",
    color: "black",
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 50,
    marginBottom: 150
  }
} );
