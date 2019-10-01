import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    marginTop: 26,
    marginLeft: 22,
    marginBottom: 10
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  card: {
    height: ( fontScale > 1 ) ? 138 : 95,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  image: {
    marginRight: 20,
    width: 68,
    height: 68,
    resizeMode: "contain"
  },
  textContainer: {
    justifyContent: "center",
    width: height > 570 ? 170 : 156
  },
  titleText: {
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    marginBottom: 1,
    lineHeight: 20,
    letterSpacing: 0.89,
    color: colors.seekForestGreen
  },
  messageText: {
    textAlign: "left",
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  startButton: {
    alignItems: "center",
    width: 59,
    marginLeft: 20
  },
  greenText: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    fontSize: 14,
    lineHeight: 17
  },
  noChallengeContainer: {
    height: ( fontScale > 1 ) ? 182 : 121,
    alignItems: "center",
    justifyContent: "center"
  },
  noChallengeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap"
  },
  noChallengeTextContainer: {
    marginLeft: 30,
    justifyContent: "center"
  },
  noChallengeText: {
    width: 229,
    textAlign: "center",
    fontFamily: fonts.medium,
    color: colors.black,
    fontSize: 19,
    lineHeight: 24
  },
  lightText: {
    marginTop: 10,
    width: 204,
    textAlign: "center",
    fontFamily: fonts.light,
    color: colors.errorGray,
    fontSize: 16,
    lineHeight: 18
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.transparent
  }
} );
