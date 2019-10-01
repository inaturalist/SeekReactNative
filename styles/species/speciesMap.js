import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginBottom: 11,
    marginTop: 45
  },
  map: {
    height: 189,
    width: width - 56
  },
  mapContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  margin: {
    marginTop: 20
  }
} );
