import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 75,
    backgroundColor: colors.seekForestGreen,
    alignItems: "center"
  },
  headerText: {
    marginTop: 35,
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  secondHeaderText: {
    marginTop: 32,
    marginBottom: 10,
    fontSize: 18,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  textContainer: {
    marginHorizontal: 25,
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.book,
    lineHeight: 21,
    color: colors.black,
    textAlign: "center"
  },
  noSpeciesHeaderText: {
    marginTop: height / 5,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
    maxWidth: 279,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  noSpeciesText: {
    marginTop: 25,
    fontSize: 16,
    fontFamily: fonts.book,
    lineHeight: 21,
    color: colors.black,
    textAlign: "center"
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
    fontSize: fontSize.buttonText,
    color: colors.white
  },
  secondTextContainer: {
    marginLeft: 25
  },
  card: {
    height: 100,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginRight: 20
  },
  speciesNameContainer: {
    maxWidth: 223
  },
  commonNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 21,
    color: colors.black,
    fontFamily: fonts.book
  },
  scientificNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    fontFamily: fonts.bookItalic,
    color: colors.black,
    fontSize: 16,
    lineHeight: 21
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  }
} );
