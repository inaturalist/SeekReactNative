// @flow
import { createContext } from "react";

const UserContext = createContext<Function>( );
const LanguageContext = createContext<Function>( );
const ObservationContext = createContext<Function>( );
const SpeciesNearbyContext = createContext<Function>( );

export {
  UserContext,
  LanguageContext,
  ObservationContext,
  SpeciesNearbyContext
};
