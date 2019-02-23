// @flow
import React from "react";
import { View } from "react-native";
import { Circle } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";
import moment from "moment";

import { colors, fonts } from "../../styles/global";
import styles from "../../styles/species/speciesChart";

type Props = {
  data: Array<Object>
};

const SpeciesChart = ( { data }: Props ) => {
  const formatXAxis = ( index ) => {
    const allMonths = moment.monthsShort();
    return allMonths[index][0];
  };

  const Decorator = ( { x, y } ) => {
    return data.map( value => (
      <Circle
        key={`circle-${value.month}`}
        cx={x( value.month )}
        cy={y( value.count )}
        r={4}
        fill={colors.seekiNatGreen}
      />
    ) );
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <View style={styles.chartRow}>
          <LineChart
            style={styles.chart}
            data={data}
            yAccessor={ ( { item } ) => item.count }
            xAccessor={( { item } ) => item.month }
            svg={{ stroke: colors.seekForestGreen }}
            contentInset={styles.chartInset}
          >
            <Decorator />
          </LineChart>
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
      ) : null}
    </View>
  );
};

export default SpeciesChart;
