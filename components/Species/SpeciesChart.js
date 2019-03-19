// @flow
import React from "react";
import { View, Text } from "react-native";
import { Circle } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";
import moment from "moment";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
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
    <View>
      <Text style={styles.headerText}>{i18n.t( "species_detail.monthly_obs" ).toLocaleUpperCase()}</Text>
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
                fill: colors.seekTeal
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SpeciesChart;
