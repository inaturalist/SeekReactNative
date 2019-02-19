// @flow
import React from "react";
import { View, Text } from "react-native";
import { XAxis, LineChart } from "react-native-svg-charts";
import * as scale from "d3-scale";
import moment from "moment";

import { colors, fonts } from "../../styles/global";
import styles from "../../styles/speciesChart";

type Props = {
  data: Array<Object>,
  error: string
};

const SpeciesChart = ( { data, error }: Props ) => {
  const formatXAxis = ( index ) => {
    console.log( index, "index in x axis" );
    const allMonths = moment.monthsShort();
    return allMonths[index][0];
  };

  return (
    <View style={styles.container}>
      {data ? (
        <View style={styles.chartRow}>
          <LineChart
            style={styles.chart}
            data={data}
            yAccessor={ ( { item } ) => item.count }
            xAccessor={( { item } ) => item.month }
            xScale={scale.scaleTime}
            svg={{
              stroke: colors.seekForestGreen,
              strokeLinejoin: "round"
            }}
            contentInset={styles.xAxisWidth}
          />
          <XAxis
            style={styles.xAxis}
            data={data}
            xAccessor={( { item } ) => item.month }
            formatLabel={value => formatXAxis( value - 1 )}
            contentInset={styles.xAxisWidth}
            svg={{
              fontSize: 18,
              fill: colors.seekTeal,
              fontFamily: fonts.default
            }}
          />
        </View>
      ) : <Text>{error}</Text>}
    </View>
  );
};

export default SpeciesChart;
