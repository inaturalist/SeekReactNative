
import {
  StyleSheet,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts,
  row,
  center
} from "../global";

const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  badge: {
    height: 105,
    resizeMode: "contain",
    width: 105
  },
  badgeSmall: {
    height: 79,
    resizeMode: "contain",
    width: 79
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
  longText: {
    fontSize: 14,
    lineHeight: 21
  },
  margin: {
    marginHorizontal: 31
  },
  marginMiddle: {
    marginRight: 29
  },
  marginMiddleSmall: {
    marginRight: 14
  },
  row,
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 178,
    textAlign: "center"
  },
  textSmall: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 178
  }
} );
