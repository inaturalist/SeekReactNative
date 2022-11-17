// @flow
import React, { useMemo } from "react";
import { View } from "react-native";
import { Circle } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";
import type { Node } from "react";

import { colors } from "../../styles/global";
// TODO: move styles to yir styles?
import styles from "../../styles/species/speciesChart";
import { createShortMonthsList } from "../../utility/dateHelpers";

type Props = {
  +data: Array<Object>,
};

const SeekYearInReviewChart = ( { data }: Props ): Node => {

  // $FlowFixMe
  const Decorator = ( { x, y } ) => data.map( ( value ) => (
    <Circle
      key={`circle-${value.month}`}
      cx={x( value.month )}
      cy={y( value.count )}
      fill={colors.seekiNatGreen}
      r={4}
    />
  ) );

  const xAccessor = ( { item } ) => item.month;
  const yAccessor = ( { item } ) => item.count;
  const lineChartSvg = { stroke: colors.seekForestGreen };

  const xAxis = useMemo( ( ) => {
    const xAxisSvg = {
      fontSize: 18,
      fill: colors.seekTeal
    };

    const allMonths = createShortMonthsList();
    const formatXAxis = ( index ) => allMonths[index];
    const formatLabel = ( value ) => formatXAxis( value - 1 );
    return (
      <XAxis
        contentInset={styles.xAxisWidth}
        data={data}
        formatLabel={formatLabel}
        svg={xAxisSvg}
        xAccessor={xAccessor}
      />
    );
  }, [data] );

  return (
    <View style={styles.chartContainer}>
      <LineChart
        contentInset={styles.chartInset}
        data={data}
        style={styles.chart}
        svg={lineChartSvg}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
      >
        <Decorator />
      </LineChart>
      {xAxis}
    </View>
  );
};

export default SeekYearInReviewChart;
