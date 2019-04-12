const faker = require( "faker" );

const { addToCollection } = require( "./helpers" );

const createFakeObservations = () => {
  for ( let i = 0; i < 2; i += 1 ) {
    const latitude = Number( faker.address.latitude() );
    const longitude = Number( faker.address.longitude() );

    const image = {
      uri: null
      // uri: "content://media/external/images/media/8153"
    };

    const observation = {
      taxon: {
        name: faker.name.findName(),
        id: faker.random.number(),
        preferred_common_name: null,
        iconic_taxon_id: 40151,
        default_photo: {
          medium_url: null
          // medium_url: "https://static.inaturalist.org/photos/19448634/medium.jpg?1528597766"
        }
      }
    };
    addToCollection( observation, latitude, longitude, image );
  }
};

const createFakePhotos = () => {
  const taxa = [];

  for ( let i = 0; i < 5; i += 1 ) {
    const taxon = {
      name: "Claytonia perfoliata",
      id: 52994,
      default_photo: {
        medium_url: null
        // medium_url: "https://static.inaturalist.org/photos/12032138/medium.jpg?1545702747",
      },
      preferred_common_name: "miner\"s lettuce"
    };
    taxa.push( taxon );
  }
  return taxa;
};

export {
  createFakeObservations,
  createFakePhotos
};
