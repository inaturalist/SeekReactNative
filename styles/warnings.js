import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    alignItems: "center",
    width,
    height
  },
  welcome: {
    fontSize: 36,
    marginTop: 60,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  earn: {
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    lineHeight: 18,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  tipContainer: {
    flex: 1
  },
  tipList: {
    marginBottom: 18,
    marginLeft: 20,
    marginRight: 100,
    flexDirection: "row"
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
  disclaimerContainer: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: 12,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  button: {
    backgroundColor: "white",
    color: "black",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: "Whitney-Semibold",
    fontSize: 18,
    textAlign: "center"
  }
} );
