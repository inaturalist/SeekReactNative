// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import mockRNLocalize from "react-native-localize/mock";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.mock( "@react-native-async-storage/async-storage", () => mockAsyncStorage );
jest.mock( "react-native-device-info", () => mockRNDeviceInfo );
jest.mock( "react-native-localize", () => mockRNLocalize );
jest.mock( "@react-native-community/netinfo", () => mockRNCNetInfo );
jest.mock( "react-native-safe-area-context", () => mockSafeAreaContext );

jest.mock( "react-native-fs", () => {
  const RNFS = {
    moveFile: async () => "testdata"
  };

  return RNFS;
} );

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock( "react-native-reanimated", () => {
  const Reanimated = require( "react-native-reanimated/mock" );

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
} );

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock( "react-native/Libraries/Animated/NativeAnimatedHelper" );

jest.mock( "@react-navigation/native", () => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useNavigation: () => ( {
      navigate: jest.fn(),
      dispatch: jest.fn()
    } )
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
