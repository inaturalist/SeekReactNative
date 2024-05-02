import * as React from "react";

const UserContext: Object = React.createContext( null );
const ObservationContext: Object = React.createContext( null );
const SpeciesNearbyContext: Object = React.createContext( null );
const ChallengeContext: Object = React.createContext( null );
const SpeciesDetailContext: Object = React.createContext( null );

export {
  UserContext,
  ObservationContext,
  SpeciesNearbyContext,
  ChallengeContext,
  SpeciesDetailContext
};
