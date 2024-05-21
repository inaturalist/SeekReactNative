import { useState, useEffect } from "react";

const createRegion = ( region: { latitude: number, longitude: number } ) => {
  const latitudeDelta = 0.2;
  const longitudeDelta = 0.2;

  return {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta,
    longitudeDelta
  };
};

interface Coords {
  latitude?: number;
  longitude?: number;
}

const useRegion = (
  coords: Coords | null,
  seenTaxa: Coords | null
) => {
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | {}>( {} );

  const setNewRegion = ( newRegion ) => setRegion( createRegion( newRegion ) );

  useEffect( () => {
    // if user has seen observation, fetch data based on obs location
    if ( seenTaxa && seenTaxa.latitude ) {
      setNewRegion( seenTaxa );
    }
  }, [seenTaxa] );

  useEffect( () => {
      // otherwise, fetch data based on user location
    if ( !seenTaxa && ( coords && coords.latitude ) ) {
      setNewRegion( coords );
    }
  }, [coords, seenTaxa] );

  return region;
};

export { useRegion };
