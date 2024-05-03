import { StyleSheet } from "react-native";

import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  chart: {
    borderBottomColor: colors.seekTeal,
    borderBottomWidth: 2,
    flex: 1,
    marginBottom: 10
  },
  chartInset: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10
  },
  chartContainer: {
    flex: 1,
    height: 150
  },
  xAxisWidth: {
    left: 10,
    right: 10
  }
} );

export default viewStyles;
