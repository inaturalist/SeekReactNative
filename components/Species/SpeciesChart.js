// @flow
import React from "react";
import { View, Text } from "react-native";
import {
  Defs,
  LinearGradient,
  Path,
  Stop
} from "react-native-svg";
import { AreaChart, XAxis, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import moment from "moment";

import styles from "../../styles/speciesChart";

type Props = {
  data: Array<Object>,
  error: string
};

const SpeciesChart = ( { data, error }: Props ) => {
  const formatXAxis = ( index ) => {
    const allMonths = moment.monthsShort();
    if ( index === 0 || index % 2 === 0 ) {
      return "      " + allMonths[index]; // super hacky, but Jan is cut off on XAxis without this
    }
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
        <Stop offset="0%" stopColor="rgb(255, 255, 255)" stopOpacity={0.8} />
        <Stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  );

  return (
    <View style={styles.container}>
      { error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <YAxis
            data={data}
            yAccessor={ ( { item } ) => item.count }
            style={styles.yAxis}
            contentInset={styles.contentInset}
            svg={{ fontSize: 10, fill: "white" }}
            min={0}
            numberOfTicks={8}
          />
          <View style={styles.chartRow}>
            <AreaChart
              style={styles.chart}
              data={data}
              yAccessor={ ( { item } ) => item.count }
              xAccessor={( { item } ) => item.month }
              xScale={scale.scaleTime}
              yScale={scale.scaleLinear}
              contentInset={styles.contentInset}
              curve={shape.curveNatural}
              svg={{ fill: "url(#gradient)" }}
              numberOfTicks={8}
            >
              <Line />
              <Gradient />
            </AreaChart>
            <XAxis
              style={styles.xAxis}
              data={data}
              xAccessor={( { item } ) => item.month }
              formatLabel={ value => formatXAxis( value - 1 ) }
              svg={{
                fontSize: 10,
                fill: "white"
              }}
            />
          </View>
        </View>
      ) }
    </View>
  );
};

export default SpeciesChart;
