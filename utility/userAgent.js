import {
  getVersion,
  getSystemName
} from "react-native-device-info";

const createUserAgent = () => `Seek ${getSystemName()} App, v${getVersion()}`;

export default createUserAgent;
