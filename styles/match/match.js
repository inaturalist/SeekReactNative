// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  dimensions
} from "../global";

const landscapeImageHeight = 315;

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 28,
    position: "absolute",
    zIndex: 1
  },
  buttonBlue: {
    backgroundColor: colors.seekTeal
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 44
  },
  center,
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  flex: {
    flex: 0
  },
  header: {
    height: 152,
    overflow: "visible"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "center"
  },
  imageCell: {
    borderRadius: 150 / 2,
    height: 150,
    width: 150
  },
  landscapeImage: {
    height: landscapeImageHeight,
    width: landscapeImageHeight,
    borderRadius: landscapeImageHeight / 2
  },
  imageContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  linkText: {
    alignSelf: "center",
    color: colors.linkText,
    fontFamily: fonts.book,
    fontSize: 18,
    textDecorationLine: "underline"
  },
  marginLarge: {
    marginTop: 50
  },
  marginLeft: {
    marginLeft: dimensions.width < 350 ? 15 : 47
  },
  largeMargin: {
    marginLeft: dimensions.width / 2 - 190
  },
  marginMedium: {
    marginBottom: 28
  },
  socialIcon: {
    right: 0,
    paddingVertical: 28,
    paddingHorizontal: 23,
    position: "absolute"
  },
  speciesText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 22,
    textAlign: "center"
  },
  scientificName: {
    fontFamily: fonts.bookItalic
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  textContainer: {
    alignSelf: "center",
    marginHorizontal: 41,
    maxWidth: 317
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flexGrow: 1
  }
} );
