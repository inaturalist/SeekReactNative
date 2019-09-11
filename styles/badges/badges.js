import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 203,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  levelImage: {
    width: 117,
    height: 117,
    resizeMode: "contain"
  },
  textContainer: {
    width: 167,
    marginLeft: 24
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  lightText: {
    marginBottom: 10,
    fontFamily: fonts.light,
    color: colors.white,
    letterSpacing: 0.78,
    fontSize: 18
  },
  text: {
    marginTop: 7,
    fontFamily: fonts.book,
    color: colors.white,
    lineHeight: 21,
    fontSize: 16
  },
  secondTextContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  badgesContainer: {
    marginHorizontal: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeIcon: {
    width: width / 4,
    height: width / 4,
    resizeMode: "contain"
  },
  gridCell: {
    width: width / 4,
    height: width / 4,
    marginHorizontal: 6
  },
  stats: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  secondHeaderText: {
    textAlign: "center",
    marginHorizontal: 23,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    lineHeight: 24,
    letterSpacing: 1.0
  },
  number: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 22,
    fontFamily: fonts.light,
    color: colors.black
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  iosSpacer: {
    backgroundColor: "#22784d",
    height: 1000,
    position: "absolute",
    top: -1000,
    left: 0,
    right: 0
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    width: 293,
    height: 52,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.white
  }
} );
