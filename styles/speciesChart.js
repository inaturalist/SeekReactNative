import { StyleSheet } from "react-native";
import { colors, margins } from "./global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.darkDesaturatedBlue,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    borderRadius: 5,
    height: 150
  },
  chart: {
    height: 150,
    marginLeft: margins.medium,
    marginRight: margins.medium
  },
  contentInset: {
    top: 30,
    bottom: 30
  }
} );
