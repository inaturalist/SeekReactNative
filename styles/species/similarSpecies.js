import { StyleSheet } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  loading: {
    alignItems: "center",
    justifyContent: "center"
  },
  similarSpeciesContainer: {
    backgroundColor: colors.seekForestGreen,
    height: 231
  },
  similarSpeciesMargins: {
    marginBottom: 11,
    marginLeft: 28,
    marginTop: 45
  }
} );
