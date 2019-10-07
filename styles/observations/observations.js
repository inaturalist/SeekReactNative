import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

export default StyleSheet.create( {
  badgeImage: {
    height: 25,
    resizeMode: "contain",
    width: 22
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.12,
    paddingTop: padding.iOSPadding
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    height: 46,
    justifyContent: "center",
    marginTop: 25,
    width: "94%"
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
  noSpecies: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 28
  },
  noSpeciesHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    maxWidth: 279,
    textAlign: "center"
  },
  noSpeciesText: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 24,
    textAlign: "center"
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.78,
    marginRight: 6,
    marginTop: Platform.OS === "ios" ? 4 : 0
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
    alignItems: "center"
  }
} );
