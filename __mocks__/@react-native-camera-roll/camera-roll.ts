import mockFaker from "tests/helpers/faker";

export const nativeInterface = jest.fn( );
export const CameraRoll = {
  getPhotos: jest.fn( ( ) => new Promise( resolve => {
    resolve( {
      page_info: {
        end_cursor: jest.fn( ),
        has_next_page: false,
      },
      edges: [
        {
          node: {
            image: {
              filename: "IMG_20210901_123456.jpg",
              filepath: "/path/to/IMG_20210901_123456.jpg",
              extension: "jpg",
              uri: "file:///path/to/IMG_20210901_123456.jpg",
              height: 1920,
              width: 1080,
              fileSize: 123456,
              playableDuration: NaN,
              orientation: 1,
            },
          },
        },
      ],
    } );
  } ) ),
  getAlbums: jest.fn( ( ) => ( {
    // Expecting album titles as keys and photo counts as values
    // "My Amazing album": 12
  } ) ),
  save: jest.fn( ( _uri, _options = {} ) => mockFaker.system.filePath( ) ),
};
