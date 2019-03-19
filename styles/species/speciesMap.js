import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: width - 56,
    height: 189
  },
  headerText: {
    marginTop: 45,
    marginBottom: 11,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  darkGreenButton: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    width: "100%",
    height: 46
  },
  darkGreenButtonText: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    color: colors.white
  }
} );
