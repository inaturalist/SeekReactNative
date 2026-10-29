export const getPredictionsForImage = jest.fn( () => Promise.resolve( {
  predictions: [],
  commonAncestor: undefined,
} ) );
export const getPredictionsForLocation = jest.fn( () => Promise.resolve( { predictions: [] } ) );
export const removeLogListener = jest.fn( );
export const resetStoredResults = jest.fn( );
export const getCellLocation = jest.fn( location => ( {
  ...location,
  elevation: 12,
} ) );

export const MODE = {
  BEST_BRANCH: "BEST_BRANCH",
  COMMON_ANCESTOR: "COMMON_ANCESTOR",
};

export const COMMON_ANCESTOR_RANK_TYPE = {
  MAJOR: "major",
  UNRESTRICTED: "unrestricted",
};
