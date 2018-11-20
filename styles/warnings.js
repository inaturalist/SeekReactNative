import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    alignItems: "center",
    width,
    height
  },
  welcome: {
    fontSize: fontSize.largeHeader,
    marginTop: margins.large,
    color: colors.white,
    fontFamily: fonts.default
  },
  earn: {
    fontSize: fontSize.header,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: margins.medium,
    lineHeight: 27,
    color: colors.white,
    fontFamily: fonts.default
  },
  tipContainer: {
    flex: 1,
    marginBottom: margins.small
  },
  tipList: {
    marginBottom: margins.small,
    marginLeft: "10%",
    marginRight: "20%",
    flexDirection: "row"
  },
  tips: {
    fontSize: fontSize.text,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap"
  },
  checkMark: {
    fontSize: fontSize.mediumHeader,
    color: colors.lightGreen,
    fontFamily: fonts.checkboxes,
    marginRight: margins.medium
  },
  disclaimerContainer: {
    flex: 1,
    marginHorizontal: margins.large,
    marginTop: margins.small
  },
  disclaimer: {
    fontSize: fontSize.smallText,
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default,
    flexWrap: "wrap"
  },
  button: {
    backgroundColor: colors.white,
    color: colors.black,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    marginBottom: margins.small,
    marginTop: margins.small,
    paddingTop: padding.small,
    paddingBottom: padding.extraSmall,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.book,
    fontSize: fontSize.buttonText,
    textAlign: "center",
    justifyContent: "center"
  }
} );
