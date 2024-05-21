import React from "react";
import { render } from "@testing-library/react-native";

import { UserContext } from "../components/UserContext";
import { LanguageProvider } from "../components/Providers/LanguageProvider";
import { AppOrientationProvider } from "../components/Providers/AppOrientationProvider";
import { ChallengeProvider } from "../components/Providers/ChallengeProvider";
import { ObservationProvider } from "../components/Providers/ObservationProvider";
import { SpeciesDetailProvider } from "../components/Providers/SpeciesDetailProvider";

const AllTheProviders = ( { children } ) => {
  return (
    <LanguageProvider
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
        <AppOrientationProvider value={{}}>
          <SpeciesDetailProvider
            value={{
              id: 1,
              region: {},
              setId: jest.fn(),
              setRegion: jest.fn()
            }}
          >
            <ChallengeProvider value={{}}>
              <ObservationProvider value={{}}>
                {children}
              </ObservationProvider>
            </ChallengeProvider>
          </SpeciesDetailProvider>
        </AppOrientationProvider>
      </UserContext.Provider>
    </LanguageProvider>
  );
};

const customRender = ( ui, options ) =>
  render( ui, { wrapper: AllTheProviders, ...options } );

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
