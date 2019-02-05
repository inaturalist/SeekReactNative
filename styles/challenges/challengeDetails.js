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
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.darkGray
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  header: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.darkGray
  },
  logo: {
    marginTop: 30,
    marginRight: 20
  },
  backButton: {
    padding: 10,
    marginTop: 20,
    marginLeft: 20
  },
  missionContainer: {
    flex: 1
  },
  challengeContainer: {
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkGray,
    marginBottom: 10
  },
  descriptionContainer: {
    alignItems: "center",
    marginTop: 21,
    backgroundColor: colors.white,
    marginHorizontal: 36
  },
  challengeHeader: {
    alignSelf: "flex-start",
    marginLeft: 36,
    fontFamily: fonts.light,
    fontSize: 22,
    color: colors.white,
    letterSpacing: 1.16
  },
  challengeName: {
    alignSelf: "flex-start",
    marginLeft: 36,
    marginRight: 36,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    color: colors.white
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 36,
    marginTop: 21,
    marginBottom: 21
  },
  text: {
    maxWidth: 183,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 16
  },
  descriptionText: {
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
    width: "80%",
    height: 46
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
