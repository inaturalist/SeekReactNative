import {
  getVersion,
  getBuildNumber,
  getSystemName,
  getSystemVersion
} from "react-native-device-info";

const createUserAgent = () => `Seek/${getVersion()} (Build ${getBuildNumber()}) ${getSystemName()}/${getSystemVersion()}`;

export default createUserAgent;
