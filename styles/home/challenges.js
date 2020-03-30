import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  challengeContainer: {
    backgroundColor: colors.darkGray,
    height: 340
  },
  container: {
    marginTop: 5
  },
  header: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "ios" ? 19 : 21,
    paddingLeft: 22,
    paddingTop: 21
  },
  loading: {
    height: 332
  },
  marginSmall: {
    marginTop: 24
  },
  marginTop: {
    marginTop: 31
  },
  viewText: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    paddingBottom: 31,
    paddingTop: 12,
    textDecorationLine: "underline"
  }
} );
