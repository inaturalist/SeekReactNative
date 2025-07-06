// @flow
import inatjs from "inaturalistjs";

interface HistogramDataPoint {
  month: number;
  count: number;
}

interface Region {
  latitude: number;
  longitude: number;
}

const createHistogramChartData = ( results: any ): HistogramDataPoint[] => {
  const countsByMonth = results.month_of_year;
  const months = Array.from( { length: 12 }, ( v, i ) => i + 1 );

  return months.map( i => {
    return { month: i, count: countsByMonth[i] };
  } );
};

const fetchHistogram = async ( id: number, region?: Region ): Promise<HistogramDataPoint[]> => {
  const params: any = {
    date_field: "observed",
    interval: "month_of_year",
    taxon_id: id
  };

  if ( region ) {
    params.lat = region.latitude;
    params.lng = region.longitude;
    params.radius = 50;
  }

  try {
    const { results } = await inatjs.observations.histogram( params );
    return createHistogramChartData( results );
  } catch ( e ) {
    return [];
  }
};

export {
  fetchHistogram
};
