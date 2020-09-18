import { StyleSheet, PixelRatio } from "react-native";
import { colors, fonts } from "../global";

const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  help: {
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 35,
    position: "absolute",
    right: 62
  },
  plantFilter: {
    bottom: 203 - 41,
    position: "absolute"
  },
  plantFilterSettings: {
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 33,
    position: "absolute",
    left: 60
  },
  scanText: {
    bottom: 109 - 26,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    lineHeight: 21,
    margin: 26,
    maxWidth: 293,
    position: "absolute",
    textAlign: "center",
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  shutter: {
    bottom: 0,
    paddingHorizontal: 48,
    paddingVertical: 18,
    position: "absolute"
  }
} );
