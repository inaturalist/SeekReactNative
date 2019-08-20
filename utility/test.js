const faker = require( "faker" );

const { createNotification } = require( "./notificationHelpers" );
const { addToCollection } = require( "./helpers" );

const createFakeObservations = () => {
  for ( let i = 0; i < 15; i += 1 ) {
    const latitude = Number( faker.address.latitude() );
    const longitude = Number( faker.address.longitude() );

    const uri = "content://media/external/images/media/8153";

    const taxonIds = {
      birds: 3,
      amphibians: 20978,
      reptiles: 26036,
      mammals: 40151,
      fish: 47178,
      mollusks: 47115,
      insects: 47158,
      arachnids: 47119,
      fungi: 47170,
      plants: 47126
    };

    const observation = {
      taxon: {
        name: faker.name.findName(),
        id: faker.random.number(),
        preferred_common_name: faker.name.findName(),
        iconic_taxon_id: taxonIds.plants,
        default_photo: {
          // medium_url: null
          medium_url: "https://static.inaturalist.org/photos/19448634/medium.jpg?1528597766"
        }
      }
    };
    addToCollection( observation, latitude, longitude, uri, new Date(), uri );
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

const createFakeNotifications = () => {
  createNotification( "challengeProgress", 0 );
  createNotification( "badgeEarned" );
  createNotification( "badgeEarned" );
  createNotification( "challengeCompleted", 0 );
};

export {
  createFakeObservations,
  createFakePhotos,
  createFakeNotifications
};
