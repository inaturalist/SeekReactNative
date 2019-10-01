import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, padding } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  bottom: {
    bottom: 70,
    position: "absolute"
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center"
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 52,
    justifyContent: "center",
    width: height < 570 ? 292 : 317
  },
  header: {
    color: colors.seekiNatGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    lineHeight: 25,
    textAlign: "center",
    width: 286
  },
  safeViewTop: {
    flex: 0
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 32,
    textAlign: "center",
    width: 250
  }
} );
