import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  challengeContainer: {
    backgroundColor: colors.darkGray,
    height: 340
  },
  container: {
    backgroundColor: colors.white,
    marginTop: 5
  },
  header: {
    paddingBottom: Platform.OS === "ios" ? 19 : 21,
    paddingLeft: 22,
    paddingTop: 21
  },
  loading: {
    height: 332
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
