import React from "react";
import { render } from "@testing-library/react-native";
import { CameraContext } from "../Components/UserContext";

// const getLoggedIn = async () => await fetchAccessToken();
// const fetchScientificNames = async () => await getScientificNames();
// const getLanguagePreference = async () => await getLanguage();
// const fetchAutoCapture = async () => await getAutoCapture();
// const fetchLocalSeasonality = async () => await getSeasonality();

// const toggleLogin = () => getLoggedIn();
// const toggleNames = () => fetchScientificNames();
// const toggleLanguagePreference = () => getLanguagePreference();
// const toggleAutoCapture = () => fetchAutoCapture();
// const toggleLocalSeasonality = () => fetchLocalSeasonality();

// const userContextValue = {
//   login,
//   toggleLogin
// };
const CameraContextValue = {
  // scientificNames,
  // toggleNames,
  autoCapture: false
  // toggleAutoCapture
};
// const languageValue = { preferredLanguage, toggleLanguagePreference };
// const seasonalityValue = { localSeasonality, toggleLocalSeasonality };

const AllTheProviders = ( { children } ) => {
  return (
    // <UserContext.Provider value={userContextValue}>
      <CameraContext.Provider value={CameraContextValue}>
        {/* <LanguageContext.Provider value={languageValue}>
          <SpeciesDetailContext.Provider value={seasonalityValue}> */}
          {children}
          {/* </SpeciesDetailContext.Provider>
        </LanguageContext.Provider> */}
      </CameraContext.Provider>
    // </UserContext.Provider>
  );
};

const customRender = ( ui, options ) =>
  render( ui, { wrapper: AllTheProviders, ...options } );

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
