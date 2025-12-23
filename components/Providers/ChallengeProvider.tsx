import * as React from "react";

const ChallengeContext = React.createContext<
  {
    challengeIndex: number | null;
    setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  } | undefined
>( undefined );

const ChallengeProvider = ( { children }: React.PropsWithChildren ) => {
  const [challengeIndex, setIndex] = React.useState<number | null>( null );

  const value = {
    challengeIndex,
    setIndex,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
};

function useChallenge() {
  const context = React.useContext( ChallengeContext );
  if ( context === undefined ) {
    throw new Error( "useChallenge must be used within a ChallengeProvider" );
  }
  return context;
}

export {
  ChallengeProvider,
  useChallenge,
};
