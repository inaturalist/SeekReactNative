import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
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
    alignItems: "center",
    marginTop: 21,
    height: 305
  },
  challengeHeader: {
    marginTop: 22,
    fontFamily: fonts.light,
    fontSize: 22,
    color: colors.white,
    letterSpacing: 1.16
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 31,
    marginBottom: 31
  },
  text: {
    maxWidth: 165,
    color: colors.white,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    lineHeight: 20,
    marginHorizontal: 16
  },
  greenButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 24,
    width: 254,
    height: 46,
    marginBottom: 21
  },
  buttonText: {
    fontSize: fontSize.buttonText,
    color: colors.white
  },
  viewText: {
    fontFamily: fonts.book,
    textDecorationLine: "underline"
  }
} );
