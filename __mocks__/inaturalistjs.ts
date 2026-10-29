export const FileUpload = jest.fn();

const inatjs = {
  setConfig: jest.fn(),
  announcements: {
    search: jest.fn( () => Promise.resolve( {
      total_results: 0,
      results: [],
    } ) ),
    dismiss: jest.fn( () => Promise.resolve( {} ) ),
  },
  observations: {
    search: jest.fn( () => Promise.resolve( {
      total_results: 42,
      results: [],
    } ) ),
    histogram: jest.fn( () => Promise.resolve( { results: [] } ) ),
    speciesCounts: jest.fn( () => Promise.resolve( { results: [] } ) ),
    create: jest.fn( () => Promise.resolve( {} ) ),
  },
  taxa: {
    fetch: jest.fn( () => Promise.resolve( { results: [{}] } ) ),
    autocomplete: jest.fn( () => Promise.resolve( { results: [] } ) ),
  },
  users: {
    me: jest.fn( () => Promise.resolve( { results: [] } ) ),
  },
  observation_photos: {
    create: jest.fn( () => Promise.resolve( {} ) ),
  },
  identifications: {
    similar_species: jest.fn( () => Promise.resolve( { results: [] } ) ),
  },
};

export default inatjs;
