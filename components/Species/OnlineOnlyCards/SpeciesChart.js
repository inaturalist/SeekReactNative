// @flow
import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { Circle } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";
import inatjs from "inaturalistjs";

import { colors } from "../../../styles/global";
import styles from "../../../styles/species/speciesChart";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import { capitalizeNames } from "../../../utility/helpers";
import { createShortMonthsList } from "../../../utility/dateHelpers";
import createUserAgent from "../../../utility/userAgent";

type Props = {
  +id: ?number
};

const SpeciesChart = ( { id }: Props ) => {
  const allMonths = createShortMonthsList();
  const [data, setData] = useState( [] );

  const fetchHistogram = useCallback( () => {
    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.histogram( params, options ).then( ( { results } ) => {
      const countsByMonth = results.month_of_year;
      const obsByMonth = [];

      for ( let i = 1; i <= 12; i += 1 ) {
        obsByMonth.push( {
          month: i,
          count: countsByMonth[i]
        } );
      }
      setData( obsByMonth );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch histogram" );
    } );
  }, [id] );

  useEffect( () => {
    fetchHistogram();
  }, [id, fetchHistogram] );

  const formatXAxis = ( index ) => capitalizeNames( allMonths[index] );

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

  return (
    <SpeciesDetailCard text="species_detail.monthly_obs" hide={!id || data.length === 0}>
      {data.length > 0 && (
        <View style={styles.container}>
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
        </View>
      )}
    </SpeciesDetailCard>
  );
};

export default SpeciesChart;
