import {
  getVersion,
  getBuildNumber,
  getSystemName,
  getSystemVersion,
  isTablet
} from "react-native-device-info";

const createUserAgent = () => `Seek/${getVersion()} ${isTablet() ? "Tablet" : null} (Build ${getBuildNumber()}) ${getSystemName()}/${getSystemVersion()}`;

export default createUserAgent;
