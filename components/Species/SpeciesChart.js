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
  data: Array<number>
};

const SpeciesChart = ( { data }: Props ) => {
  const months = ["Jan", "Mar", "May", "Jul", "Sept", "Nov"];

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
        style={styles.yAxis}
        contentInset={styles.contentInset}
        svg={{ fontSize: 10, fill: "white" }}
        min={0}
      />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <AreaChart
          style={styles.chart}
          data={data}
          contentInset={styles.contentInset}
          curve={shape.curveNatural}
          svg={{ fill: "url(#gradient)" }}
        >
          <Line />
          <Gradient />
        </AreaChart>
        <XAxis
          style={{ marginHorizontal: 10, height: 30 }}
          data={data}
          formatLabel={( value, index ) => index}
          contentInset={styles.contentInset}
          svg={{ fontSize: 10, fill: "white" }}
        />
      </View>
    </View>
  );
};

export default SpeciesChart;
