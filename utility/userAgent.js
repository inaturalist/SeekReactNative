// @flow

import {
  getVersion,
  getBuildNumber,
  getSystemName,
  getSystemVersion,
  getDeviceType
} from "react-native-device-info";

const createUserAgent = ( ): string => `Seek/${getVersion()} ${getDeviceType()} (Build ${getBuildNumber()}) ${getSystemName()}/${getSystemVersion()}`;

export default createUserAgent;
