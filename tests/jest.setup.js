import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import mockRNDeviceInfo from "react-native-device-info/jest/react-native-device-info-mock";
import mockRNLocalize from "react-native-localize/mock";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock";

jest.mock( "@react-native-async-storage/async-storage", () => mockAsyncStorage );
jest.mock( "react-native-device-info", () => mockRNDeviceInfo );
jest.mock( "react-native-localize", () => mockRNLocalize );
jest.mock( "@react-native-community/netinfo", () => mockRNCNetInfo );

jest.mock( "react-native-fs", () => {
  const RNFS = {
    moveFile: async () => "testdata"
  };

  return RNFS;
} );

const mockConfig = {
  jwtSecret: "some_secret",
  appId: "some_id",
  appSecret: "some_secret",
  redirectURI: ""
};
jest.mock( "../config", () => mockConfig );
