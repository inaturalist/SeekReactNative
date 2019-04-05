import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    height: 150,
    flexDirection: "row"
  },
  headerText: {
    marginTop: 45,
    marginBottom: 11,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  chartRow: {
    flex: 1
  },
  chart: {
    flex: 1,
    borderBottomColor: colors.seekTeal,
    borderBottomWidth: 2
  },
  chartInset: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  xAxisWidth: {
    left: 10,
    right: 10
  },
  xAxis: {
    marginTop: 10
  }
} );
