import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  center: {
    alignItems: "center"
  },
  centerSelf: {
    alignSelf: "center"
  },
  container: {
    marginBottom: 32,
    marginHorizontal: 23,
    marginTop: 37
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
