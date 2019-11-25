import {
  getVersion,
  getBuildNumber,
  getSystemName,
  getSystemVersion,
  getDeviceType
} from "react-native-device-info";

const createUserAgent = () => `Seek/${getVersion()} ${getDeviceType()} (Build ${getBuildNumber()}) ${getSystemName()}/${getSystemVersion()}`;

export default createUserAgent;
