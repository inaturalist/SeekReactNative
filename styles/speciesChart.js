import { StyleSheet } from "react-native";
import { colors, margins, padding } from "./global";

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
    alignItems: "center",
    marginBottom: margins.medium
  },
  chartRow: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15
  },
  chart: {
    flex: 1,
    height: 150,
    marginTop: margins.medium,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    borderLeftColor: colors.white,
    borderLeftWidth: 0.5
  },
  contentInset: {
    top: 30,
    bottom: 30
  },
  xAxis: {
    marginBottom: margins.medium,
    marginLeft: margins.medium + 5,
    height: 30
  }
} );
