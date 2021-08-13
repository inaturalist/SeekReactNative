// @flow

import React, { useState } from "react";
import type { Node } from "react";

import { ChallengeContext } from "../UserContext";

type Props = {
  children: any
}

const ChallengeProvider = ( { children }: Props ): Node => {
  const [challengeIndex, setIndex] = useState( null );

  const challengeValue = {
    challengeIndex,
    setIndex
  };

  return (
    <ChallengeContext.Provider value={challengeValue}>
      {children}
    </ChallengeContext.Provider>
  );
};

export default ChallengeProvider;
