import { StyleSheet } from "react-native";
import { colors, margins, padding } from "./global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.darkDesaturatedBlue,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    padding: padding.medium,
    borderRadius: 5,
    height: 150
  },
  errorContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    textAlign: "center"
  },
  chartContainer: {
    flex: 1,
    flexDirection: "row"
  },
  yAxis: {
    marginBottom: margins.medium
  },
  chartRow: {
    flex: 1,
    marginLeft: margins.small,
    marginRight: margins.small
  },
  chart: {
    flex: 1,
    borderLeftColor: colors.white,
    borderLeftWidth: 1,
    borderBottomColor: colors.white,
    borderBottomWidth: 1
  },
  contentInset: {
    top: 20,
    bottom: 5
  },
  xAxis: {
    height: 15
  }
} );
