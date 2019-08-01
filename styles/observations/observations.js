import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerRow: {
    marginHorizontal: 25,
    marginTop: 18,
    marginBottom: 23,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  numberText: {
    marginTop: 4,
    fontSize: 18,
    fontFamily: fonts.light,
    letterSpacing: 0.78,
    color: colors.black,
    marginRight: 6
  },
  badgeImage: {
    width: 22,
    height: 25,
    resizeMode: "contain"
  },
  secondHeaderText: {
    marginTop: 4,
    fontSize: 18,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  textContainer: {
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.book,
    lineHeight: 21,
    color: colors.black,
    textAlign: "center"
  },
  noSpecies: {
    marginHorizontal: 28,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  noSpeciesHeaderText: {
    textAlign: "center",
    maxWidth: 279,
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.0,
    color: colors.seekForestGreen
  },
  noSpeciesText: {
    marginTop: 24,
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  greenButton: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    width: "94%",
    height: 46
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    color: colors.white
  },
  loadingWheel: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  }
} );
