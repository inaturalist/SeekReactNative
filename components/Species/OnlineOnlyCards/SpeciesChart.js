// @flow
import React, { useState, useCallback, useEffect, useContext, useMemo } from "react";
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
import { SpeciesDetailContext } from "../../UserContext";

type Props = {
  +id: number,
  +region: Object
};

const SpeciesChart = ( { id, region }: Props ) => {
  const { localSeasonality } = useContext( SpeciesDetailContext );
  const [data, setData] = useState( [] );

  const createHistogram = ( results ) => {
    const countsByMonth = results.month_of_year;
    const obsByMonth = [];

    for ( let i = 1; i <= 12; i += 1 ) {
      obsByMonth.push( { month: i, count: countsByMonth[i] } );
    }
    setData( obsByMonth );
  };

  const fetchHistogram = useCallback( ( params ) => {
    const options = { user_agent: createUserAgent( ) };

    inatjs.observations.histogram( params, options ).then( ( { results } ) => {
      createHistogram( results );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch histogram" );
    } );
  }, [] );

  const setParams = useCallback( ( ) => {
    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id
    };

    if ( localSeasonality ) {
      if ( region.latitude ) {
        // $FlowFixMe
        params.lat = region.latitude;
        // $FlowFixMe
        params.lng = region.longitude;
        // $FlowFixMe
        params.radius = 50;
      }
    }
    fetchHistogram( params );
  }, [id, region, localSeasonality, fetchHistogram] );

  useEffect( ( ) => {
    let isCurrent = true;
    if ( isCurrent ) {
      setParams( );
    }
    return ( ) => {
      isCurrent = false;
    };
  } , [setParams] );

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
    const formatXAxis = ( index ) => capitalizeNames( allMonths[index] );
    const formatLabel = ( value ) => formatXAxis( value - 1 );
    return (
      <XAxis
        contentInset={styles.xAxisWidth}
        data={data}
        formatLabel={formatLabel}
        style={styles.xAxis}
        svg={xAxisSvg}
        xAccessor={xAccessor}
      />
    );
  }, [data] );

  return (
    <SpeciesDetailCard text="species_detail.monthly_obs" hide={data.length === 0}>
      <View style={styles.container}>
        <View style={styles.chartRow}>
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
      </View>
    </SpeciesDetailCard>
  );
};

export default SpeciesChart;
