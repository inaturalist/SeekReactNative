import { StyleSheet } from "react-native";

import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
  },
  containerWhite: {
    backgroundColor: colors.white,
  },
  darkGreen: {
    backgroundColor: colors.speciesNearbyGreen,
  },
  green: {
    backgroundColor: colors.seekForestGreen,
  },
  black: {
    backgroundColor: colors.black,
  },
  loadingWheel: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
} );

export default viewStyles;
