import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  touchable
} from "../global";

export default StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
  },
  commonNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 21
  },
  flagBackButton: {
    marginLeft: 33,
    marginRight: 29
  },
  flagButton: {
    alignItems: "center",
    borderRadius: 40,
    height: 46,
    justifyContent: "center",
    width: 243
  },
  flagContainer: {
    alignItems: "center",
    marginHorizontal: 30
  },
  flagHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 62
  },
  flagHeaderContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  flagTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    marginTop: 15
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 24,
    paddingTop: padding.iOSPadding,
    textAlign: "center"
  },
  image: {
    borderRadius: 80 / 2,
    height: 80,
    marginRight: 20,
    width: 80
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden"
  },
  largeFlagButton: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 40,
    height: 79,
    justifyContent: "center",
    width: 278
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginLeft: 23,
    width: 292
  },
  scientificNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 5
  },
  speciesNameContainer: {
    maxWidth: 223
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    width: 292
  },
  touchable
} );
