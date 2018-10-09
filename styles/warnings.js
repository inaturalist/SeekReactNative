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
    marginTop: "20%",
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  earn: {
    fontSize: 20,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: "10%",
    lineHeight: 18,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  tipContainer: {
    flex: 1
  },
  tipList: {
    marginBottom: 18,
    marginLeft: "10%",
    marginRight: "20%",
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
    flex: 1,
    marginHorizontal: "10%",
    marginTop: "1%"
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: 12,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    flexWrap: "wrap"
  },
  button: {
    backgroundColor: "white",
    color: "black",
    marginLeft: 20,
    marginRight: 20,
    marginTop: "5%",
    paddingTop: "1%",
    paddingBottom: "1%",
    borderRadius: 40
  },
  buttonText: {
    fontFamily: "Whitney-Semibold",
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center"
  }
} );
