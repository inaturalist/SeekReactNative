import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import React, { useState } from "react";

const CameraLocationPreferenceContext = React.createContext<
  | {
    userDisabledLocation: boolean;
    setUserDisabledLocation: Dispatch<SetStateAction<boolean>>;
  }
  | undefined
>( undefined );

const CameraLocationPreferenceProvider = ( { children }: PropsWithChildren ) => {
  const [userDisabledLocation, setUserDisabledLocation] = useState( false );

  const value = {
    userDisabledLocation,
    setUserDisabledLocation,
  };

  return (
    <CameraLocationPreferenceContext.Provider value={value}>
      {children}
    </CameraLocationPreferenceContext.Provider>
  );
};

function useCameraLocationPreference() {
  const context = React.useContext( CameraLocationPreferenceContext );
  if ( context === undefined ) {
    throw new Error(
      "useCameraLocationPreference must be used within a CameraLocationPreferenceProvider",
    );
  }
  return context;
}

export { CameraLocationPreferenceProvider, useCameraLocationPreference };
