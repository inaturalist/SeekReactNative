import { StyleSheet, Platform } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  bottomPadding: {
    backgroundColor: colors.seekForestGreen,
    height: Platform.OS === "android" ? 17 : 60
  },
  empty: {
    backgroundColor: colors.white
  },
  loading: {
    alignItems: "center",
    justifyContent: "center"
  },
  similarSpeciesContainer: {
    backgroundColor: colors.seekForestGreen,
    height: 231
  },
  similarSpeciesHeader: {
    marginBottom: 11,
    marginLeft: 28,
    marginTop: 45
  }
} );
