// @flow
import { createContext } from "react";

const UserContext: Object = createContext<Function>( );
const LanguageContext: Object = createContext<Function>( );
const ObservationContext: Object = createContext<Function>( );
const SpeciesNearbyContext: Object = createContext<Function>( );
const AppOrientationContext: Object = createContext<Function>( );
const ChallengeContext: Object = createContext<Function>( );
const SpeciesDetailContext: Object = createContext<Function>( );

export {
  UserContext,
  LanguageContext,
  ObservationContext,
  SpeciesNearbyContext,
  AppOrientationContext,
  ChallengeContext,
  SpeciesDetailContext
};
