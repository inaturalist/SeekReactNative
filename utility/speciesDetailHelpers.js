// @flow
import inatjs from "inaturalistjs";

const createHistogramChartData = ( results ): Array<{ month: number, count: number }> => {
  const countsByMonth = results.month_of_year;
  const months = Array.from( { length: 12 }, ( v, i ) => i + 1 );

  return months.map( i => {
    return { month: i, count: countsByMonth[i] };
  } );
};

const fetchHistogram = async ( id: number, region?: ?{
  latitude: number,
  longitude: number
} ): Promise<Array<Object>> => {
  const params = {
    date_field: "observed",
    interval: "month_of_year",
    taxon_id: id
  };

  if ( region ) {
    // $FlowFixMe
    params.lat = region.latitude;
    // $FlowFixMe
    params.lng = region.longitude;
    // $FlowFixMe
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
