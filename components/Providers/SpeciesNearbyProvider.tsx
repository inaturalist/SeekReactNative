import React, { useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import { useLocationName } from "../../utility/customHooks";

type SpeciesNearbyState = {
  latitude: number | null,
  longitude: number | null,
  taxaType: string,
  // TODO: what type here?
  // Result of query to: const site = "https://api.inaturalist.org/v1/taxa/nearby";
  taxa: any[],
  isConnected: boolean | null
};
interface SpeciesNearby extends SpeciesNearbyState {
  location: string | null
}
const SpeciesNearbyContext = React.createContext<
  {
    speciesNearby: SpeciesNearby,
    setSpeciesNearby: React.Dispatch<React.SetStateAction<SpeciesNearbyState>>
  } | undefined
>( undefined );

type SpeciesNearbyProps = {children: React.ReactNode}
const SpeciesNearbyProvider = ( { children }: SpeciesNearbyProps ) => {
  const netInfo = useNetInfo( );
  const { isConnected } = netInfo;
  const [speciesNearby, setSpeciesNearby] = useState<SpeciesNearbyState>( {
    latitude: null,
    longitude: null,
    taxaType: "all",
    taxa: [],
    isConnected
  } );

  const location = useLocationName( speciesNearby.latitude, speciesNearby.longitude );

  const value = {
    speciesNearby: {
      ...speciesNearby,
      location
    },
    setSpeciesNearby
  };

  return (
    <SpeciesNearbyContext.Provider value={value}>
      {children}
    </SpeciesNearbyContext.Provider>
  );
};

function useSpeciesNearby() {
  const context = React.useContext( SpeciesNearbyContext );
  if ( context === undefined ) {
    throw new Error( "useSpeciesNearby must be used within a SpeciesNearbyProvider" );
  }
  return context;
}

export { SpeciesNearbyProvider, useSpeciesNearby };
