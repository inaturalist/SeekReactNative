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
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.black
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.transparent
  },
  challengeBackground: {
    height: 405
  },
  header: {
    height: 85
  },
  backButton: {
    top: 18,
    marginLeft: 23
  },
  image: {
    padding: 5
  },
  logo: {
    alignSelf: "center",
    height: 58,
    width: 116,
    resizeMode: "contain"
  },
  challengeHeader: {
    marginLeft: 32,
    fontFamily: fonts.light,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    color: colors.white,
    letterSpacing: 0.78
  },
  challengeName: {
    marginTop: 5,
    marginHorizontal: 32,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 20 : 23,
    letterSpacing: 1.0,
    color: colors.white
  },
  badge: {
    width: 93,
    height: 105,
    resizeMode: "contain"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 38,
    marginTop: ( fontScale > 1 ) ? 15 : 21,
    marginBottom: ( fontScale > 1 ) ? 20 : 28
  },
  text: {
    textAlign: "center",
    maxWidth: width - ( 105 + 28 + 76 ),
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    lineHeight: ( fontScale > 1 ) ? null : 25,
    marginLeft: 26
  },
  missionContainer: {
    flex: 1
  },
  descriptionContainer: {
    alignItems: "center",
    marginTop: 21,
    backgroundColor: colors.white,
    marginHorizontal: 36
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  photographerText: {
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 25
  },
  greenButton: {
    marginHorizontal: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 24,
    height: 46
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    fontSize: 18,
    color: colors.white
  },
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    textDecorationLine: "underline"
  },
  touchable,
  secondHeader: {
    marginTop: 21,
    marginLeft: 35
  },
  headerText: {
    textAlign: "left",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  }
} );
