import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, padding } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  safeViewTop: {
    flex: 0
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  header: {
    textAlign: "center",
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: 1.12,
    fontFamily: fonts.semibold,
    color: colors.seekiNatGreen
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    width: height < 570 ? 292 : 317,
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
  },
  bottom: {
    position: "absolute",
    bottom: 70
  }
} );
