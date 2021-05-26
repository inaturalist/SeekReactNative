// @flow

import React, { useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import type { Node } from "react";

import { SpeciesNearbyContext } from "../UserContext";
import { useLocationName } from "../../utility/customHooks";

type Props = {
  children: any
}

const SpeciesNearbyProvider = ( { children }: Props ): Node => {
  const netInfo = useNetInfo( );
  const { isConnected } = netInfo;
  const [speciesNearby, setSpeciesNearby] = useState( {
    latitude: null,
    longitude: null,
    taxaType: "all",
    taxa: [],
    isConnected
  } );

  const location = useLocationName( speciesNearby.latitude, speciesNearby.longitude );

  const speciesNearbyValue = {
    speciesNearby: {
      ...speciesNearby,
      location
    },
    setSpeciesNearby
  };

  return (
    <SpeciesNearbyContext.Provider value={speciesNearbyValue}>
      {children}
    </SpeciesNearbyContext.Provider>
  );
};

export default SpeciesNearbyProvider;
