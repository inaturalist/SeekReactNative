import createUserAgent from "./userAgent";
import i18n from "../i18n";
import { createJwtToken } from "./helpers";

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

enum LogLevels {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}
interface Log {
  level: LogLevels;
  message: string;
  context: string;
  errorType: string;
}
const logToApi = async ( { level, message, context, errorType }: Log ): Promise<any> => {
  const site = "https://api.inaturalist.org/v2/log";

  const formData = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    error_type: errorType
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": createUserAgent( ),
      "Authorization": createJwtToken( )
    },
    body: JSON.stringify( formData )
  };

  try {
    const response = await fetch( site, options );
    return response;
  } catch ( e ) {
    return "unknown";
  }
};

export {
  fetchSpeciesNearby,
  logToApi
};
