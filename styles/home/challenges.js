import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width, height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  centeredContent: {
    alignItems: "center"
  },
  challengeContainer: {
    backgroundColor: colors.darkGray,
    height: 332,
    marginTop: 21
  },
  challengeHeader: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 0.78,
    marginTop: 32
  },
  challengeName: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 20 : 23,
    letterSpacing: 1.0
  },
  header: {
    marginLeft: 22,
    marginTop: 21
  },
  image: {
    marginRight: 27
  },
  lightText: {
    color: colors.errorGray,
    fontFamily: fonts.light,
    fontSize: 16,
    lineHeight: 18,
    marginTop: 10,
    textAlign: "center",
    width: 204
  },
  margin: {
    marginBottom: 14
  },
  noChallengeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  noChallengeRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  noChallengeText: {
    color: colors.errorGray,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    textAlign: "center",
    width: 229
  },
  noChallengeTextContainer: {
    justifyContent: "center",
    marginLeft: 30
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginBottom: ( fontScale > 1 ) ? 10 : 28,
    marginHorizontal: 32,
    marginTop: ( fontScale > 1 ) ? 10 : 21
  },
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: ( fontScale > 1 || height < 570 ) ? 14 : 16,
    lineHeight: ( fontScale > 1 || height < 570 ) ? null : 24,
    maxWidth: width - ( 116 + 27 + 64 )
  },
  textContainer: {
    marginHorizontal: 32
  },
  viewText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    textDecorationLine: "underline"
  }
} );
