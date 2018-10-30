import { StyleSheet } from "react-native";
import { colors, margins } from "./global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.darkDesaturatedBlue,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    borderRadius: 5,
    height: 150,
    flexDirection: "row"
  },
  yAxis: {
    alignItems: "center"
  },
  chart: {
    flex: 1,
    height: 150,
    marginTop: margins.medium,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    marginBottom: margins.medium,
    borderLeftColor: colors.white,
    borderLeftWidth: 0.5
  },
  contentInset: {
    top: 30,
    bottom: 30
  }
} );
