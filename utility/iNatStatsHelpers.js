import AsyncStorage from "@react-native-community/async-storage";

import createUserAgent from "./userAgent";

const setiNatStats = ( observations, observers ) => {
  AsyncStorage.setItem( "observations", observations.toString() );
  AsyncStorage.setItem( "observers", observers.toString() );
};

const fetchiNatStats = () => {
  const options = { headers: { "User-Agent": createUserAgent() } };

  fetch( "https://www.inaturalist.org/stats/summary.json", options )
    .then( response => response.json() )
    .then( ( responseJson ) => {
      const totalObservations = responseJson.total_observations;
      const totalObservers = responseJson.total_observers;
      const observations = Math.round( totalObservations / 1000000 ) * 1000000;
      const observers = Math.round( totalObservers / 10000 ) * 10000;

      setiNatStats( observations, observers );
    } )
    .catch( ( e ) => {
      console.log( e );
    } );
};

const getiNatStats = async () => {
  try {
    const observations = await AsyncStorage.getItem( "observations" );
    const observers = await AsyncStorage.getItem( "observers" );
    if ( observations === null ) {
      fetchiNatStats();
      return false;
    }

    return {
      observations: Number( observations ),
      observers: Number( observers )
    };
  } catch ( error ) {
    return false;
  }
};

export {
  fetchiNatStats,
  getiNatStats
};
