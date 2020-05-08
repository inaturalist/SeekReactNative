// @flow
import AsyncStorage from "@react-native-community/async-storage";

const checkIsEmailValid = ( email ) => {
  if ( email && email.length > 5 ) {
    if ( email.includes( "@" ) && email.includes( "." ) ) {
      return true;
    }
  }
  return false;
};

const checkIsUsernameValid = ( username ) => {
  if ( username && ( username.length >= 3 && username.length <= 40 ) ) {
    if ( typeof ( username.charAt( 0 ) ) !== "number" ) {
      return true;
    }
  }
  return false;
};

const saveAccessToken = ( token ) => {
  AsyncStorage.setItem( "access_token", token.toString() );
};

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

const savePostingSuccess = ( success ) => {
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

const formatError = ( error ) => {
  let newError;

  if ( error.includes( "\n" ) ) {
    newError = error.replace( /\n/g, " " );
  }
  return newError || error;
};

export {
  saveAccessToken,
  fetchAccessToken,
  removeAccessToken,
  checkIsEmailValid,
  checkIsUsernameValid,
  savePostingSuccess,
  fetchPostingSuccess,
  formatError
};
