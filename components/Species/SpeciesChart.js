// @flow
import React from "react";
import { View } from "react-native";
import { Circle } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";
import moment from "moment";

// import i18n from "../../i18n";
import { colors } from "../../styles/global";
import styles from "../../styles/species/speciesChart";
import GreenText from "../UIComponents/GreenText";
import { capitalizeNames } from "../../utility/helpers";

type Props = {
  +data: Array<Object>
};

const SpeciesChart = ( { data }: Props ) => {
  // const locale = i18n.locale.split( "-" )[0];

  const formatXAxis = ( index ) => {
    const allMonths = moment.monthsShort();

    // if ( locale === "ja" ) {
    //   return capitalizeNames( allMonths[index] );
    // }
    return capitalizeNames( allMonths[index][0] );
  };

  // $FlowFixMe
  const Decorator = ( { x, y } ) => data.map( value => (
    <Circle
      key={`circle-${value.month}`}
      cx={x( value.month )}
      cy={y( value.count )}
      fill={colors.seekiNatGreen}
      r={4}
    />
  ) );

  return (
    <View>
      <View style={styles.headerMargins}>
        <GreenText
          text="species_detail.monthly_obs"
        />
      </View>
      <View style={styles.container}>
        {data.length > 0 ? (
          <View style={styles.chartRow}>
            <LineChart
              contentInset={styles.chartInset}
              data={data}
              style={styles.chart}
              svg={{ stroke: colors.seekForestGreen }}
              xAccessor={( { item } ) => item.month}
              yAccessor={( { item } ) => item.count}
            >
              <Decorator />
            </LineChart>
            <XAxis
              contentInset={styles.xAxisWidth}
              data={data}
              formatLabel={value => formatXAxis( value - 1 )}
              style={styles.xAxis}
              svg={{
                fontSize: 18,
                fill: colors.seekTeal
              }}
              xAccessor={( { item } ) => item.month}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SpeciesChart;
