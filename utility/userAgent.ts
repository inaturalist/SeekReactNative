import { Platform } from "react-native";
import {
  getApiLevel,
  getBrand,
  getBuildNumber,
  getDeviceId,
  getDeviceType,
  getSystemName,
  getSystemVersion,
  getVersion,
} from "react-native-device-info";

const DETAILS = [
  `Build ${getBuildNumber()}`,
  `${getSystemName()} ${getSystemVersion()}`,
  getDeviceId( ),
  getDeviceType( ),
];

async function getOtherDetails( ) {
  DETAILS.push( `${getBrand( )}` );
  if ( Platform.OS === "android" ) {
    DETAILS.push( `SDK ${await getApiLevel( )}` );
  }
}
getOtherDetails( );

// User agent being used, when calling the iNat APIs
function createUserAgent( ) {
  return `Seek/${getVersion()} (${DETAILS.join( "; " )})`;
}

export default createUserAgent;
