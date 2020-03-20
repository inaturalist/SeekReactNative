
import {
  StyleSheet,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts,
  dimensions,
  row,
  center
} from "../global";

const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  badge: {
    height: 105,
    marginRight: 26,
    resizeMode: "contain",
    width: 93
  },
  badgeSmall: {
    height: 73,
    marginRight: 29,
    resizeMode: "contain",
    width: 65
  },
  center,
  challengeHeader: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 0.78
  },
  challengeName: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 20 : 23,
    letterSpacing: 1.0,
    marginTop: 5,
    maxWidth: 318
  },
  image: {
    marginRight: 27
  },
  margin: {
    marginHorizontal: 31
  },
  row,
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: ( fontScale > 1 || dimensions.height < 570 ) ? 14 : 16,
    lineHeight: ( fontScale > 1 || dimensions.height < 570 ) ? null : 24,
    maxWidth: dimensions.width - ( 116 + 27 + 64 )
  },
  textSmall: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 178
  }
} );
