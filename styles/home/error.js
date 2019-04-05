import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  background: {
    width,
    height: 223,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    textAlign: "center",
    color: colors.white,
    maxWidth: 245,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12
  },
  greenButton: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 5 : null,
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 24,
    width: 284,
    height: 34
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    fontSize: 16,
    color: colors.white
  }
} );
