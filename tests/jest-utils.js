import React from "react";
import { render } from "@testing-library/react-native";

import {
  SpeciesDetailContext,
  AppOrientationContext,
  UserContext,
  LanguageContext
} from "../components/UserContext";

const AllTheProviders = ( { children } ) => {
  return (
    <LanguageContext.Provider
      value={{
        preferredLanguage: "en",
        toggleLanguagePreference: jest.fn()
      }}
    >
      <UserContext.Provider
        value={{
          login: "some_token",
          userProfile: {
            login: "some_name",
            icon: "some_photo"
          }
        }}
      >
        <AppOrientationContext.Provider value={{}}>
          <SpeciesDetailContext.Provider value={{}}>
            {children}
          </SpeciesDetailContext.Provider>
        </AppOrientationContext.Provider>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
};

const customRender = ( ui, options ) =>
  render( ui, { wrapper: AllTheProviders, ...options } );

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
