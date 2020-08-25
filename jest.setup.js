import { NativeModules } from "react-native";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

global.fetch = require( "jest-fetch-mock" );

NativeModules.RNCNetInfo = {
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

jest.mock( "@react-navigation/native", () => ( {
  useNavigation: jest.fn( () => ( {
    addListener: jest.fn(),
    navigate: jest.fn()
  } ) ),
  useRoute: jest.fn().mockReturnValue( { name: "About" } )
} ) );

jest.mock( "react-native-safe-area-context", () => ( {
  useSafeArea: jest.fn().mockReturnValue( { insets: { top: 1 } } )
} ) );

jest.mock( "@react-native-community/async-storage", () => mockAsyncStorage );

jest.mock( "react-native-fs", () => ( {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
} ) );

jest.mock( "react-native-device-info", () => ( {
  getVersion: jest.fn(),
  getDeviceType: jest.fn(),
  getBuildNumber: jest.fn(),
  getSystemName: jest.fn(),
  getSystemVersion: jest.fn()
} ) );

jest.mock( "react-native-geolocation-service", () => ( {
  getCurrentPosition: jest.fn()
} ) );
