import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: colors.white
  },
  image: {
    marginBottom: 25,
    height: width / 2,
    justifyContent: "center",
    width: width / 2
  },
  imageStyle: {
    resizeMode: "contain"
  },
  headerText: {
    marginHorizontal: 27,
    marginBottom: 9,
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12,
    lineHeight: 24
  },
  backButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  nameText: {
    marginTop: 6,
    marginHorizontal: 27,
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  italicText: {
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 27,
    textAlign: "center",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 25,
    color: colors.black
  }
} );
