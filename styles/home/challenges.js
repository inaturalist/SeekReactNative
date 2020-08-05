import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  challengeContainer: {
    backgroundColor: colors.darkGray,
    flex: 1
  },
  container: {
    backgroundColor: colors.white
  },
  header: {
    paddingBottom: 21,
    paddingHorizontal: 22,
    paddingTop: Platform.OS === "ios" ? 10 : 0
  },
  marginMedium: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: 22
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
    paddingTop: 15,
    textDecorationLine: "underline"
  }
} );
