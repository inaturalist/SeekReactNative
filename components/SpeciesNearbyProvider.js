import React, { useState } from "react";

import { SpeciesNearbyContext } from "./UserContext";
import { useLocationName } from "../utility/customHooks";

type Props = {
  children: any
}

const SpeciesNearbyProvider = ( { children }: Props ) => {
  const [speciesNearby, setSpeciesNearby] = useState( {
    latitude: null,
    longitude: null,
    taxaType: "all",
    taxa: []
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
