import { NativeModules } from "react-native";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn( () => Promise.resolve() ),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

jest.mock( "@react-native-community/async-storage", () => mockAsyncStorage );

jest.mock( "react-native-localize", () => ( {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  findBestAvailableLanguage: jest.fn()
} ) );

jest.mock( "react-native-fs", () => ( {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
} ) );

jest.mock( "react-native-device-info", () => ( {
  getVersion: jest.fn(),
  getBuildNumber: jest.fn()
} ) );

jest.mock( "react-navigation", () => ( {
  withNavigation: component => component,
  addListener: jest.fn()
} ) );
