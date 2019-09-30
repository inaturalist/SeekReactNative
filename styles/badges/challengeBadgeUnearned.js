import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 52,
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 37,
    width: 293
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    lineHeight: 24,
    marginBottom: 9,
    marginHorizontal: 27,
    textAlign: "center"
  },
  image: {
    height: width / 2,
    justifyContent: "center",
    marginBottom: 25,
    width: width / 2
  },
  imageStyle: {
    resizeMode: "contain"
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 40
  },
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 16,
    marginHorizontal: 27,
    marginTop: 16,
    maxWidth: 256,
    textAlign: "center"
  },
  nameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 27,
    marginTop: 6,
    textAlign: "center"
  }
} );
