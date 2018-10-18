import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    alignItems: "center",
    width,
    height
  },
  welcome: {
    fontSize: fontSize.largeHeader,
    marginTop: "20%",
    color: colors.white,
    fontFamily: fonts.default
  },
  earn: {
    fontSize: fontSize.header,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: "10%",
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
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
    fontSize: fontSize.text,
    lineHeight: 14,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap"
  },
  checkMark: {
    fontSize: 24,
    color: colors.lightGreen,
    fontFamily: fonts.playful,
    marginRight: 15
  },
  disclaimerContainer: {
    flex: 1,
    marginHorizontal: "10%",
    marginTop: "1%"
  },
  disclaimer: {
    fontSize: fontSize.smallText,
    lineHeight: 12,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap"
  },
  button: {
    backgroundColor: colors.white,
    color: colors.black,
    marginLeft: 20,
    marginRight: 20,
    marginTop: "5%",
    paddingTop: "1%",
    paddingBottom: "1%",
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.button,
    fontSize: fontSize.buttonText,
    textAlign: "center",
    justifyContent: "center"
  }
} );
