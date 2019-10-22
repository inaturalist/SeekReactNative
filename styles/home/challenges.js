import {
  StyleSheet,
  Dimensions,
  PixelRatio,
  Platform
} from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width, height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  centeredContent: {
    alignItems: "center",
    paddingBottom: 14,
    paddingTop: 14
  },
  challengeContainer: {
    backgroundColor: colors.darkGray,
    height: 332
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
  container: {
    marginTop: 5
  },
  header: {
    paddingBottom: Platform.OS === "ios" ? 19 : 21,
    paddingLeft: 22,
    paddingTop: 21
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
