import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

const { height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  card: {
    height: ( fontScale > 1 ) ? 138 : 95,
    justifyContent: "space-around",
    marginHorizontal: 20
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center"
  },
  header: {
    marginBottom: 10,
    marginLeft: 22,
    marginTop: 26
  },
  image: {
    height: 68,
    marginRight: 20,
    resizeMode: "contain",
    width: 68
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
    marginTop: 23
  },
  margins: {
    marginBottom: 23,
    marginTop: 39
  },
  messageText: {
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "left"
  },
  noChallengeContainer: {
    alignItems: "center",
    height: ( fontScale > 1 ) ? 182 : 121,
    justifyContent: "center"
  },
  noChallengeText: {
    color: colors.black,
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
  row,
  startButton: {
    alignItems: "center",
    marginLeft: 20,
    width: 59
  },
  textContainer: {
    justifyContent: "center",
    width: height > 570 ? 170 : 156
  },
  titleText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    letterSpacing: 0.89,
    lineHeight: 20,
    marginBottom: 1
  }
} );
