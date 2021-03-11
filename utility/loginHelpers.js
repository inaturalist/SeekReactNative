// @flow
import AsyncStorage from "@react-native-async-storage/async-storage";
// import inatjs from "inaturalistjs";
// import { Alert } from "react-native";

// import { fetchJSONWebToken } from "./uploadHelpers";

const checkIsEmailValid = ( email: string ) => {
  if ( email && email.length > 5 ) {
    if ( email.includes( "@" ) && email.includes( "." ) ) {
      return true;
    }
  }
  return false;
};

const checkIsUsernameValid = ( username: string ) => {
  if ( username && ( username.length >= 3 && username.length <= 40 ) ) {
    if ( typeof ( username.charAt( 0 ) ) !== "number" ) {
      return true;
    }
  }
  return false;
};

const saveAccessToken = ( token: string ) => AsyncStorage.setItem( "access_token", token );

const fetchAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem( "access_token" );
    return token;
  } catch ( error ) {
    return false;
  }
};

const removeAccessToken = async () => {
  try {
    const token = await AsyncStorage.removeItem( "access_token" );
    return token;
  } catch ( error ) {
    return false;
  }
};

const savePostingSuccess = ( success: boolean ) => {
  AsyncStorage.setItem( "posting_success", success.toString() );
};

const fetchPostingSuccess = async () => {
  try {
    const success = await AsyncStorage.getItem( "posting_success" );
    return success;
  } catch ( error ) {
    return false;
  }
};

const formatError = ( error: string ) => {
  let newError;

  if ( error.includes( "\n" ) ) {
    newError = error.replace( /\n/g, " " );
  }
  return newError || error;
};

// const showPromptToSwitchPhotoLicense = ( ) => {
  // call users.update
  // params = { id, user[make_photo_licenses_same] === true }
  // Alert.alert(
    // title,
    // message,
    // [
    //   {
    //     text: "Cancel",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel"
    //   },
    //   { text: "Update license", onPress: () => updateLicense( ) }
    // ],
    // { cancelable: false }
//   );
// };

// const fetchUserId = async ( login: string ) => {
//   try {
//     const apiToken = await fetchJSONWebToken( login );
//     console.log( apiToken, "token " );
//     const options = { api_token: apiToken };
//     const { results } = await inatjs.users.me( options );
//     if ( results.preferred_observation_license === null ) {
//       showPromptToSwitchPhotoLicense( );
//     }
//     console.log( results, "fetch user id" );
//   } catch ( e ) {
//     console.log( e.message, "error fetching user id" );
//   }
// };

export {
  saveAccessToken,
  fetchAccessToken,
  removeAccessToken,
  checkIsEmailValid,
  checkIsUsernameValid,
  savePostingSuccess,
  fetchPostingSuccess,
  formatError
  // fetchUserId
};
