import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.darkGray
  },
  logo: {
    marginRight: 10
  },
  backButton: {
    marginLeft: 20,
    marginHorizontal: 10
  },
  challengeContainer: {
    flex: 1,
    height: 370,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkGray
  },
  missionContainer: {
    alignItems: "center",
    marginTop: 21,
    backgroundColor: colors.white,
    marginHorizontal: 22
  },
  challengeHeader: {
    marginTop: 22,
    alignSelf: "flex-start",
    marginLeft: 23,
    fontFamily: fonts.light,
    fontSize: 22,
    color: colors.white,
    letterSpacing: 1.16
  },
  challengeName: {
    alignSelf: "flex-start",
    marginLeft: 23,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    color: colors.white
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
    maxWidth: 183,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 16
  },
  missionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  greenButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 24,
    width: 292,
    height: 46,
    marginBottom: 21
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: fontSize.buttonText,
    color: colors.white
  },
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 18,
    textDecorationLine: "underline",
    marginBottom: 50
  }
} );
