import * as React from "react";

const UserContext: Object = React.createContext( null );
const SpeciesNearbyContext: Object = React.createContext( null );
const SpeciesDetailContext: Object = React.createContext( null );

export {
  UserContext,
  SpeciesNearbyContext,
  SpeciesDetailContext
};
