import {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const { width } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  badge: {
    height: 105,
    resizeMode: "contain",
    width: 93
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.12,
    paddingTop: Platform.OS === "ios" ? 7 : 0
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
    marginHorizontal: 36,
    marginTop: 21
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 24,
    height: 46,
    justifyContent: "center",
    marginHorizontal: 42
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    textAlign: "left"
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
  missionContainer: {
    flex: 1
  },
  photographerText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25,
    textAlign: "center"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginBottom: ( fontScale > 1 ) ? 20 : 28,
    marginHorizontal: 38,
    marginTop: ( fontScale > 1 ) ? 15 : 21
  },
  safeViewTop: {
    backgroundColor: colors.black,
    flex: 0
  },
  secondHeader: {
    marginLeft: 35,
    marginTop: 21
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    lineHeight: ( fontScale > 1 ) ? null : 25,
    marginLeft: 26,
    maxWidth: width - ( 105 + 28 + 76 ),
    textAlign: "center"
  },
  touchable,
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    textDecorationLine: "underline"
  }
} );
