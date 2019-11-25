import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  badgeImage: {
    height: 25,
    resizeMode: "contain",
    width: 22
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  headerRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    marginBottom: 23,
    marginHorizontal: 25,
    marginTop: 18
  },
  loadingWheel: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  marginSmall: {
    marginRight: 7
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.78,
    marginRight: 6,
    marginTop: Platform.OS === "ios" ? 4 : 0
  },
  padding: {
    paddingBottom: Platform.OS === "android" ? 40 : 60
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  secondHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginTop: 4
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 25
  }
} );
