import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const { width, height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  badge: {
    height: 105,
    resizeMode: "contain",
    width: 93
  },
  challengeBackground: {
    height: 405
  },
  challengeHeader: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 0.78,
    marginLeft: 32
  },
  challengeName: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 20 : 23,
    letterSpacing: 1.0,
    marginHorizontal: 32,
    marginTop: 5
  },
  descriptionContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 21
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  image: {
    padding: 5
  },
  logo: {
    alignSelf: "center",
    height: 58,
    resizeMode: "contain",
    width: 116
  },
  logoContainer: {
    alignSelf: "center",
    paddingTop: 18,
    position: "absolute"
  },
  margin: {
    marginTop: 50
  },
  marginHorizontal: {
    marginHorizontal: 36
  },
  marginTop: {
    marginTop: 16
  },
  padding: {
    padding: 25
  },
  photographerText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginBottom: ( fontScale > 1 ) ? 20 : 28,
    marginTop: ( fontScale > 1 ) ? 15 : 21
  },
  safeView: {
    backgroundColor: colors.black,
    flex: 0
  },
  secondHeader: {
    marginTop: 21
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: ( fontScale > 1 || height < 570 ) ? 14 : 16,
    lineHeight: ( fontScale > 1 || height < 570 ) ? null : 25,
    marginLeft: 26,
    maxWidth: width - ( 105 + 28 + 74 ),
    textAlign: "center"
  },
  touchable,
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    textDecorationLine: "underline"
  },
  whiteContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 36
  }
} );
