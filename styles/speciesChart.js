import { StyleSheet, Dimensions } from "react-native";
import { colors, margins } from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    height: 150,
    flexDirection: "row",
    marginBottom: 20
  },
  chartRow: {
    flex: 1,
    marginLeft: margins.small,
    marginRight: margins.small
  },
  chart: {
    flex: 1,
    borderBottomColor: colors.seekTeal,
    borderBottomWidth: 2
  },
  xAxisWidth: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  xAxis: {
    marginTop: 10,
    height: 20
  }
} );
