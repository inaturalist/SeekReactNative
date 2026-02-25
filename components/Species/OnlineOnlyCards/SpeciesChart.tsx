import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View } from "react-native";
import type { NumberProp } from "react-native-svg";
import { Circle } from "react-native-svg";
import { XAxis, LineChart } from "react-native-svg-charts";

import { colors } from "../../../styles/global";
import styles from "../../../styles/species/speciesChart";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import { createShortMonthsList } from "../../../utility/dateHelpers";
import { fetchHistogram } from "../../../utility/speciesDetailHelpers";
import { useFetchUserSettings } from "../../../utility/customHooks/useFetchUserSettings";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  readonly id: number;
  readonly region: {
    latitude: number;
    longitude: number;
  };
}

interface Datum {
  month: number;
  count: number;
}

interface DecoratorProps {
  readonly data: Datum[];
  // These are propped in by LineChart, don't know how to satisfy TS here
  x: ( _: number ) => NumberProp;
  y: ( _: number ) => NumberProp;
}

const Decorator = ( { data, x, y }: DecoratorProps ) => data.map( ( value ) => (
  <Circle
    key={`circle-${value.month}`}
    cx={x( value.month )}
    cy={y( value.count )}
    fill={colors.seekiNatGreen}
    r={4}
  />
) );

const SpeciesChart = ( { id, region }: Props ) => {
  const settings = useFetchUserSettings( ) as { localSeasonality?: boolean };
  const localSeasonality = settings?.localSeasonality;
  const [data, setData] = useState<Datum[]>( [] );
  const [loading, setLoading] = useState( false );

  const createHistogram = useCallback( async ( ) => {
    // not showing chart at all if user prefers local seasonality
    // but has location permissions off
    // and is looking at a species they haven't observed before
    if ( localSeasonality && !region.latitude ) {
      return;
    }
    if ( localSeasonality === undefined ) {
      return;
    }
    setLoading( true );
    if ( !loading ) {
      const chartData = await fetchHistogram( id, localSeasonality ? region : null ) as Datum[];
      setData( chartData );
    }
  }, [id, localSeasonality, region, loading] );

  useEffect( ( ) => {
    let isCurrent = true;

    if ( isCurrent ) {
      createHistogram( );
    }
    return ( ) => {
      isCurrent = false;
    };
  } , [createHistogram] );

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
    <SpeciesDetailCard text="species_detail.monthly_obs" hide={data.length === 0}>
      <View style={styles.chartContainer}>
        <LineChart
          contentInset={styles.chartInset}
          data={data}
          style={styles.chart}
          svg={lineChartSvg}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        >
          <Decorator data={data} />
        </LineChart>
        {xAxis}
      </View>
    </SpeciesDetailCard>
  );
};

export default SpeciesChart;
