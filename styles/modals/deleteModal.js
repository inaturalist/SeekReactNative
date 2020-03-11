import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row
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
  flagHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 62,
    width: "100%"
  },
  flagTextContainer: {
    justifyContent: "flex-end",
    marginTop: 15
  },
  headerStyling: {
    marginRight: 15,
    paddingTop: 9
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
  }
} );
