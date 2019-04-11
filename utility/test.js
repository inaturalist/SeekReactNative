const faker = require( "faker" );

const { addToCollection } = require( "./helpers" );

const createFakeObservations = () => {
  for ( let i = 0; i < 20; i += 1 ) {
    const latitude = Number( faker.address.latitude() );
    const longitude = Number( faker.address.longitude() );

    const image = {
      uri: "content://media/external/images/media/8153"
    };

    const observation = {
      taxon: {
        name: faker.name.findName(),
        id: faker.random.number(),
        preferred_common_name: faker.name.findName(),
        iconic_taxon_id: 3,
        default_photo: {
          medium_url: "https://static.inaturalist.org/photos/19448634/medium.jpg?1528597766"
        }
      }
    };
    addToCollection( observation, latitude, longitude, image );
  }
};

export {
  createFakeObservations
};
