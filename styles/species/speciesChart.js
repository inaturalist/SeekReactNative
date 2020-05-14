import { StyleSheet } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  chart: {
    borderBottomColor: colors.seekTeal,
    borderBottomWidth: 2,
    flex: 1
  },
  chartInset: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10
  },
  chartRow: {
    flex: 1
  },
  container: {
    flexDirection: "row",
    height: 150
  },
  xAxis: {
    marginTop: 10
  },
  xAxisWidth: {
    left: 10,
    right: 10
  }
} );
