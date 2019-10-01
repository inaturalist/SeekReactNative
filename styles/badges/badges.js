import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  badgeIcon: {
    height: width / 4,
    resizeMode: "contain",
    width: width / 4
  },
  badgesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 26
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 52,
    justifyContent: "center",
    width: 293
  },
  gridCell: {
    height: width / 4,
    marginHorizontal: 6,
    width: width / 4
  },
  header: {
    alignItems: "center",
    height: 203,
    justifyContent: "center"
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  levelImage: {
    height: 117,
    resizeMode: "contain",
    width: 117
  },
  lightText: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.78,
    marginBottom: 10
  },
  number: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 22,
    marginTop: 10,
    textAlign: "center"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  safeViewTop: {
    backgroundColor: colors.seekForestGreen,
    flex: 0
  },
  secondHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginHorizontal: 23,
    textAlign: "center"
  },
  secondTextContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  stats: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 7
  },
  textContainer: {
    marginLeft: 24,
    width: 167
  }
} );
