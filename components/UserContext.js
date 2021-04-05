// @flow
import { createContext } from "react";

const UserContext = createContext<Function>( );
const CameraContext = createContext<Function>( );
const LanguageContext = createContext<Function>( );

export {
  UserContext,
  CameraContext,
  LanguageContext
};
