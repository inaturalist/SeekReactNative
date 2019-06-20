import { StyleSheet, Dimensions, Platform } from "react-native";
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
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    textAlign: "center",
    marginTop: 25,
    marginBottom: Platform.OS === "android" ? 19 : 15,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  image: {
    marginTop: height > 570 ? 50 : 30,
    width: height > 570 ? 258 : 215,
    height: height > 570 ? 258 : 215,
    resizeMode: "contain"
  },
  nameText: {
    marginTop: 32,
    marginBottom: height > 570 ? 43 : 30,
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
