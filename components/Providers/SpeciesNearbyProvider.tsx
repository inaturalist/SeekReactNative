import React, { useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import { useLocationName } from "../../utility/customHooks";
import SpeciesNearby from "../Home/SpeciesNearby/SpeciesNearby";

type SpeciesNearby = {
  latitude: number | null,
  longitude: number | null,
  taxaType: string,
  // TODO: what type here?
  taxa: any[],
  isConnected: boolean | null
};
interface SpeciesNearbyState extends SpeciesNearby {
  location: string | null
}
const SpeciesNearbyContext = React.createContext<
  {
    speciesNearby: SpeciesNearbyState,
    setSpeciesNearby: React.Dispatch<React.SetStateAction<SpeciesNearby>>
  } | undefined
>( undefined );

type SpeciesNearbyProps = {children: React.ReactNode}
const SpeciesNearbyProvider = ( { children }: SpeciesNearbyProps ) => {
  const netInfo = useNetInfo( );
  const { isConnected } = netInfo;
  const [speciesNearby, setSpeciesNearby] = useState<SpeciesNearby>( {
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
