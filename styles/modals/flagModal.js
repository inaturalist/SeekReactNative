import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  colors,
  fonts
} from "../global";

const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
  },
  flagBackButton: {
    marginLeft: 33,
    marginRight: 29
  },
  flagButtonContainer: {
    marginHorizontal: 22,
    marginTop: 20
  },
  flagContainer: {
    alignItems: "center",
    marginHorizontal: 22
  },
  flagHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 167,
    overflow: "visible"
  },
  flagImageCell: {
    borderRadius: 129 / 2,
    height: 129,
    width: 129
  },
  flagTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    marginTop: 15
  },
  imageContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  innerContainer: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    width: 366
  },
  marginLarge: {
    marginTop: 45
  },
  marginMedium: {
    marginTop: 32
  },
  marginSmall: {
    marginTop: 16
  },
  paddingSmall: {
    paddingTop: 9
  },
  speciesText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 8,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    width: 292
  }
} );
