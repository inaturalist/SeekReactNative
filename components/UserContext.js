// @flow
import { createContext } from "react";

const UserContext = createContext<Function>();
const CameraContext = createContext<Function>();
const LanguageContext = createContext<Function>();
const SpeciesDetailContext = createContext<Function>();

export {
  UserContext,
  CameraContext,
  LanguageContext,
  SpeciesDetailContext
};
