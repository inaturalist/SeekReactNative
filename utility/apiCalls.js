// @flow
import createUserAgent from "./userAgent";
import i18n from "../i18n";

const fetchSpeciesNearby = async ( params: Object ): any => {
  const staticParams = {
    per_page: 20,
    observed_on: new Date( ),
    seek_exceptions: true,
    locale: i18n.locale,
    all_photos: true // this allows for ARR license filtering
  };

  const allParams = {
    ...staticParams,
    ...params
  };

  const site = "https://api.inaturalist.org/v1/taxa/nearby";
  const queryString = Object.keys( allParams ).map( key => `${key}=${allParams[key.toString( )]}` ).join( "&" );

  const options = { headers: { "User-Agent": createUserAgent( ) } };
  const url = `${site}?${queryString}`;

  try {
    const response = await fetch( url, options );
    const { results } = await response.json( );
    const newTaxa = results.map( r => r.taxon );
    return newTaxa;
  } catch ( e ) {
    return "unknown";
  }
};

export {
  fetchSpeciesNearby
};
