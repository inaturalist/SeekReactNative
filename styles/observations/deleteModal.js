import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row,
  touchable
} from "../global";

export default StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
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
  flagTextContainer: {
    justifyContent: "flex-end",
    marginTop: 15
  },
  headerStyling: {
    marginRight: 15,
    paddingTop: 9
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  largeFlagButton: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 40,
    height: 79,
    justifyContent: "center",
    width: 278
  },
  margin: {
    marginTop: 27
  },
  marginLarge: {
    marginTop: 32
  },
  marginSmall: {
    marginTop: 16
  },
  row,
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
