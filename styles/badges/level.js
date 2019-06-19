import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  outerContainer: {
    flex: 1
  },
  container: {
    borderRadius: 40,
    backgroundColor: colors.white
  },
  backgroundColor: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    textAlign: "center",
    marginTop: 25,
    marginBottom: 19,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  image: {
    width: 213,
    height: 213
  },
  nameText: {
    marginTop: 28,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  text: {
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: fonts.book,
    color: colors.black,
    lineHeight: 21,
    fontSize: 16
  },
  backButton: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: "transparent"
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  }
} );
