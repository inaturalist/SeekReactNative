import React, { useState } from "react";

const SpeciesDetailContext = React.createContext<
  {
    id: number | null;
    region: string | null;
    setId: React.Dispatch<React.SetStateAction<number | null>>;
    setRegion: React.Dispatch<React.SetStateAction<string | null>>;
  } | undefined
>( undefined );

type SpeciesDetailProps = {children: React.ReactNode}
const SpeciesDetailProvider = ( { children }: SpeciesDetailProps ) => {
  const [id, setId] = useState<number | null>( null );
  const [region, setRegion] = useState<string | null>( null );

  const value = {
    id,
    region,
    setId,
    setRegion
  };

  return (
    <SpeciesDetailContext.Provider value={value}>
      {children}
    </SpeciesDetailContext.Provider>
  );
};

function useSpeciesDetail() {
  const context = React.useContext( SpeciesDetailContext );
  if ( context === undefined ) {
    throw new Error( "useSpeciesDetail must be used within a SpeciesDetailProvider" );
  }
  return context;
}

export { SpeciesDetailProvider, useSpeciesDetail };
