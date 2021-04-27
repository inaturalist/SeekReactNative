// @flow
import { createContext } from "react";

const UserContext = createContext<Function>( );
const LanguageContext = createContext<Function>( );
const ObservationContext = createContext<Function>( );

export {
  UserContext,
  LanguageContext,
  ObservationContext
};
