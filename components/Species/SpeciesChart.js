// @flow
import React from "react";
import { View } from "react-native";
import {
  Defs,
  LinearGradient,
  Path,
  Stop
} from "react-native-svg";
import { AreaChart, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";

import styles from "../../styles/speciesChart";

type Props = {
  data: Array<Object>
};

const SpeciesChart = ( { data }: Props ) => {
  const Line = ( { line } ) => (
    <Path
      key="line"
      d={line}
      stroke="rgb(255, 255, 255)"
      strokeWidth={3}
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
          contentInset={styles.contentInset}
          curve={shape.curveNatural}
          svg={{ fill: "url(#gradient)" }}
        >
          <Line />
          <Gradient />
        </AreaChart>
        <XAxis
          style={styles.xAxis}
          data={data}
          xAccessor={( { item } ) => item.month }
          formatLabel={ ( value, index ) => index }
          spacingInner={0.5}
          svg={{
            fontSize: 10,
            fill: "white"
          }}
        />
      </View>
    </View>
  );
};

export default SpeciesChart;
