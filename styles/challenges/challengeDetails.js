import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const { width } = Dimensions.get( "window" );

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
    backgroundColor: colors.black
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  challengeBackground: {
    height: 405,
    width
  },
  header: {
    height: 85
  },
  logo: {
    alignSelf: "center",
    height: 58,
    width: 116,
    resizeMode: "contain"
  },
  backButton: {
    top: 18,
    marginLeft: 23
  },
  image: {
    padding: 5
  },
  missionContainer: {
    flex: 1
  },
  challengeContainer: {
    height: 315,
    alignItems: "flex-start",
    justifyContent: "center",
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
  leftRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginLeft: 36,
    marginTop: 21,
    marginBottom: 28
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 36,
    marginTop: 21,
    marginBottom: 29
  },
  text: {
    maxWidth: 183,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 26
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  photographerText: {
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25
  },
  greenButton: {
    marginLeft: 36,
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
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    fontSize: 18,
    color: colors.white
  },
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    textDecorationLine: "underline"
  },
  touchable
} );
