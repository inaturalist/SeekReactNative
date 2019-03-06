import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    marginTop: 21,
    marginLeft: 22
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  challengeContainer: {
    backgroundColor: colors.darkGray,
    marginTop: 21,
    height: 332
  },
  textContainer: {
    marginHorizontal: 32
  },
  challengeHeader: {
    marginTop: 32,
    fontFamily: fonts.light,
    fontSize: 18,
    color: colors.white,
    letterSpacing: 0.78
  },
  challengeName: {
    fontFamily: fonts.semibold,
    fontSize: 23,
    color: colors.white,
    letterSpacing: 1.0
  },
  centeredContent: {
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 28
  },
  text: {
    maxWidth: 165,
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16
  },
  greenButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 24,
    height: 46,
    marginBottom: 14
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    paddingHorizontal: 33,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0,
    color: colors.white
  },
  viewText: {
    fontFamily: fonts.book,
    textDecorationLine: "underline",
    color: colors.white,
    fontSize: 16
  }
} );
