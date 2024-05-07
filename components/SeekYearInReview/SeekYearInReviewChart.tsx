import React, { useMemo } from "react";
import { View } from "react-native";
import { Circle, NumberProp } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";

import { colors } from "../../styles/global";
import styles from "../../styles/species/speciesChart";
import { createShortMonthsList } from "../../utility/dateHelpers";
import { baseTextStyles } from "../../styles/textStyles";

interface Datum {
  month: number;
  count: number;
}
interface Props {
  readonly data: Datum[];
}

const SeekYearInReviewChart = ( { data }: Props ) => {
  const Decorator = ( { x, y }: { x: ( _: number ) => NumberProp, y: ( _: number ) => NumberProp } ) => data.map( ( value ) => (
    <Circle
      key={`circle-${value.month}`}
      cx={x( value.month )}
      cy={y( value.count )}
      fill={colors.seekiNatGreen}
      r={4}
    />
  ) );

  const xAccessor = ( { item }: { item: Datum } ) => item.month;
  const yAccessor = ( { item }: { item: Datum } ) => item.count;
  const lineChartSvg = { stroke: colors.seekForestGreen };

  const xAxis = useMemo( ( ) => {
    const allMonths = createShortMonthsList();
    const formatXAxis = ( index: number ) => allMonths[index];
    const formatLabel = ( value: number ) => formatXAxis( value - 1 );
    return (
      <XAxis
        contentInset={styles.xAxisWidth}
        data={data}
        formatLabel={formatLabel}
        svg={baseTextStyles.chartAxis}
        xAccessor={xAccessor}
      />
    );
  }, [data] );

  return (
    <View
      testID="year-in-review-chart-container"
      style={styles.chartContainer}
    >
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
