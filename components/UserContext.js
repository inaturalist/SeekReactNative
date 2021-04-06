// @flow
import { createContext } from "react";

const UserContext = createContext<Function>( );
const LanguageContext = createContext<Function>( );

export {
  UserContext,
  LanguageContext
};
