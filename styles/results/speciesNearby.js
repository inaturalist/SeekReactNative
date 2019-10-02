import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  headerText: {
    alignSelf: "center",
    color: colors.seekTeal,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 20
  },
  speciesNearbyContainer: {
    backgroundColor: colors.seekTeal,
    height: 223
  }
} );
