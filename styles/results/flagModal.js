import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const fontScale = PixelRatio.getFontScale();

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
    borderTopLeftRadius: 40,
    overflow: "visible"
  },
  flagHeader: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: 167,
    overflow: "visible"
  },
  flagButtonContainer: {
    marginTop: 20,
    marginHorizontal: 22
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap"
  },
  flagTextContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "nowrap"
  },
  flagImageCell: {
    width: 129,
    height: 129,
    borderRadius: 129 / 2
  },
  flagContainer: {
    marginHorizontal: 22,
    alignItems: "center"
  },
  speciesText: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    color: colors.black,
    marginBottom: 8
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
    backgroundColor: "#973838",
    width: 278,
    height: 79,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  largeButtonHeight: {
    flexWrap: "wrap",
    lineHeight: ( fontScale > 1 ) ? 14 : 24
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    color: colors.white,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    letterSpacing: 1.0
  },
  flagBackButton: {
    marginLeft: 33,
    marginRight: 29
  },
  touchable
} );
