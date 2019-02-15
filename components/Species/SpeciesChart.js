// @flow
import React from "react";
import { View } from "react-native";
import {
  Defs,
  LinearGradient,
  Path,
  Stop
} from "react-native-svg";
import { AreaChart, XAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import moment from "moment";

import { colors, fonts } from "../../styles/global";
import styles from "../../styles/speciesChart";

type Props = {
  data: Array<Object>
};

const SpeciesChart = ( { data }: Props ) => {
  const formatXAxis = ( index ) => {
    const allMonths = moment.monthsShort();
    return allMonths[index][0]; // super hacky, but Jan is cut off on XAxis without this
  };

  const Line = ( { line } ) => (
    <Path
      key="line"
      d={line}
      stroke="rgb(255, 255, 255)"
      strokeWidth="3"
      fill="none"
    />
  );

  const Gradient = ( { index } ) => (
    <Defs key={index}>
      <LinearGradient id="gradient" x1="0%" y="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor={colors.seekiNatGreen} stopOpacity={0.8} />
        <Stop offset="100%" stopColor={colors.seekiNatGreen} stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  );

  return (
    <View style={styles.container}>
      <View style={styles.chartRow}>
        <AreaChart
          style={styles.chart}
          data={data}
          yAccessor={ ( { item } ) => item.count }
          xAccessor={( { item } ) => item.month }
          xScale={scale.scaleTime}
          curve={shape.curveNatural}
          svg={{ fill: "url(#gradient)" }}
          numberOfTicks={6}
        >
          <Line />
          <Gradient />
        </AreaChart>
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
    </View>
  );
};

export default SpeciesChart;
