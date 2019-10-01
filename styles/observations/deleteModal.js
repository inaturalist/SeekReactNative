import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  touchable
} from "../global";

export default StyleSheet.create( {
  innerContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: colors.white,
    overflow: "hidden"
  },
  flagHeaderContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  flagHeader: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: 62
  },
  flagTextContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "nowrap"
  },
  flagContainer: {
    marginHorizontal: 30,
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.white,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    letterSpacing: 1.0
  },
  headerText: {
    textAlign: "center",
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    lineHeight: 24,
    letterSpacing: 1.0,
    marginBottom: 24
  },
  text: {
    width: 292,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.book
  },
  flagButton: {
    width: 243,
    height: 46,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  largeFlagButton: {
    backgroundColor: colors.red,
    width: 278,
    height: 79,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  flagBackButton: {
    marginLeft: 33,
    marginRight: 29
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
  touchable,
  row: {
    width: 292,
    marginLeft: 23,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  }
} );
