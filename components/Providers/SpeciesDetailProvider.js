// @flow

import React, { useState } from "react";
import type { Node } from "react";

import { SpeciesDetailContext } from "../UserContext";

type Props = {
  children: any
}

const SpeciesDetailProvider = ( { children }: Props ): Node => {
  const [id, setId] = useState( null );
  const [region, setRegion] = useState( null );

  const speciesDetailValue = {
    id,
    region,
    setId
  };

  return (
    <SpeciesDetailContext.Provider value={speciesDetailValue}>
      {children}
    </SpeciesDetailContext.Provider>
  );
};

export default SpeciesDetailProvider;
