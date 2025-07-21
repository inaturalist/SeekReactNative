// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";
import "@shopify/flash-list/jestSetup";
// Recommendation from the uuid library is to import get-random-values before
// uuid, so we're importing it first thing in the entry point.
// https://www.npmjs.com/package/uuid#react-native--expo
import "react-native-get-random-values";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import * as mockRNLocalize from "react-native-localize/mock";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
import {
  mockCamera,
  mockSortDevices,
  mockUseCameraDevice,
  mockUseCameraFormat
} from "./vision-camera/vision-camera";

require( "react-native-reanimated" ).setUpTests();

jest.mock( "@react-native-async-storage/async-storage", () => mockAsyncStorage );
jest.mock( "react-native-device-info", () => mockRNDeviceInfo );
jest.mock( "react-native-localize", () => mockRNLocalize );
jest.mock( "@react-native-community/netinfo", () => mockRNCNetInfo );
jest.mock( "react-native-safe-area-context", () => mockSafeAreaContext );

jest.mock( "vision-camera-plugin-inatvision" );
jest.mock( "react-native-worklets-core", () => ( {
  Worklets: {
    createRunInJsFn: jest.fn()
  }
} ) );

jest.mock( "react-native-fs", () => {
  const RNFS = {
    moveFile: async () => "testdata"
  };

  return RNFS;
} );

const mockErrorHandler = ( error ) => {
  console.log( error );
};
jest.mock( "react-native-exception-handler", () => ( {
  setJSExceptionHandler: jest
    .fn()
    .mockImplementation( ( ) => mockErrorHandler() ),
  setNativeExceptionHandler: jest
    .fn()
    .mockImplementation( ( ) => mockErrorHandler() )
} ) );

jest.mock( "@react-navigation/native", () => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useNavigation: () => ( {
      navigate: jest.fn(),
      dispatch: jest.fn(),
      // To intercept on focus listener
      addListener: ( event, callback ) => {
        if ( event === "focus" ) {
          callback();
        }
      }
    } ),
    useRoute: () => ( {} ),
    useScrollToTop: () => jest.fn()
  };
} );

jest.mock( "react-native-geolocation-service", () => ( {
  getCurrentPosition: jest.fn().mockImplementation( ( successCallback ) => {
    const position = {
      coords: {
        latitude: 42.42,
        longitude: 42.42,
        accuracy: 42
      }
    };
    successCallback( position );
  } ),
  requestAuthorization: jest.fn().mockImplementation( () => Promise.resolve( true ) )
} ) );

jest.mock( "react-native-geocoder", () => ( {
  geocodePosition: jest.fn().mockImplementation( ( { lat, lng } ) => {
    return new Promise( ( resolve, reject ) => {
      resolve( [
        {
          adminArea: "CA",
          country: "United States",
          countryCode: "US",
          feature: "771 Bush St",
          formattedAddress:
            "771 Bush St, San Francisco, CA  94108, United States",
          locality: "San Francisco",
          position: { lat: 37.79, lng: -122.41 },
          postalCode: "94108",
          streetName: "Bush St",
          streetNumber: "771",
          subAdminArea: "San Francisco",
          subLocality: "Union Square"
        }
      ] );
    } );
  } )
} ) );

jest.mock( "realm", () => {
  const actualRealm = jest.requireActual( "realm" );
  actualRealm.open = jest.fn(
    ( config ) =>
      new Promise( ( resolve ) => {
        resolve( {
          objects: jest.fn( ( table ) => {
            switch ( table ) {
              case "BadgeRealm":
                return {
                  filtered: jest.fn( () => {
                    return new Array( 0 );
                  } )
                };
              case "LoginRealm":
                return [{ observationCount: 42 }];
              case "NotificationRealm":
                return [
                  {
                    challengeIndex: 36,
                    iconName: "badge_empty",
                    index: 0,
                    message: "notifications.view_challenges",
                    nextScreen: "ChallengeDetails",
                    seen: true,
                    title: "notifications.new_challenge",
                    viewed: true
                  }
                ];
              case "TaxonRealm":
                return new Array( 42 );
              case "ObservationRealm":
                return [
                  {
                    date: new Date( "2022-12-02T10:19:54.000Z" ),
                    latitude: 42,
                    longitude: 42,
                    taxon: {
                      ancestorIds: [1, 2, 3],
                      defaultPhoto: {
                        backupUri: "some_uri",
                        lastUpdated: null,
                        mediumUrl: "some_medium_url"
                      },
                      iconicTaxonId: 1,
                      id: 4242,
                      name: "some_name_1",
                      preferredCommonName: "some_common_name_1"
                    },
                    uuidString: "some_uuid_2"
                  },
                  {
                    date: new Date( "2022-12-02T10:19:54.000Z" ),
                    latitude: 42,
                    longitude: 42,
                    taxon: {
                      ancestorIds: [1, 2, 3],
                      defaultPhoto: {
                        backupUri: "some_uri",
                        lastUpdated: null,
                        mediumUrl: "some_medium_url"
                      },
                      iconicTaxonId: 1,
                      id: 4242,
                      name: "some_name_2",
                      preferredCommonName: null
                    },
                    uuidString: "some_uuid_2"
                  }
                ];
              default:
                break;
            }
          } ),
          write: jest.fn( () => {} )
        } );
      } )
  );
  return actualRealm;
} );

jest.mock( "react-native-vision-camera", () => ( {
  Camera: mockCamera,
  sortDevices: mockSortDevices,
  useCameraDevice: mockUseCameraDevice,
  useCameraFormat: mockUseCameraFormat,
  useFrameProcessor: jest.fn(),
  VisionCameraProxy: {
    initFrameProcessorPlugin: jest.fn()
  }
} ) );

jest.mock( "@react-native-camera-roll/camera-roll", () => ( {
  CameraRoll: {
    getPhotos: jest.fn(
      () =>
        new Promise( ( resolve ) => {
          resolve( {
            page_info: {
              end_cursor: jest.fn(),
              has_next_page: false
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
                    orientation: 1
                  }
                }
              }
            ]
          } );
        } )
    ),
    getAlbums: jest.fn( () => ( {
      // Expecting album titles as keys and photo counts as values
      // "My Amazing album": 12
    } ) ),
    save: jest.fn( ( _uri, _options = {} ) => "test_url" )
  }
} ) );


