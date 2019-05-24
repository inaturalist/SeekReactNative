const { AsyncStorage } = require( "react-native" );
// const { version } = require( "../package.json" );

const checkIsEmailValid = ( email ) => {
  if ( email.length > 5 ) {
    if ( email.includes( "@" ) && email.includes( "." ) ) {
      return true;
    }
  }
  return false;
};

const checkIsUsernameValid = ( username ) => {
  if ( username.length >= 3 && username.length <= 40 ) {
    if ( typeof ( username.charAt( 0 ) ) !== "number" ) {
      return true;
    }
  }
  return false;
};

const setIsLoggedIn = ( loggedIn ) => {
  AsyncStorage.setItem( "logged_in", loggedIn.toString() );
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

const setSeenLogin = () => {
  AsyncStorage.setItem( "has_seen_login", "true" );
};

const checkIfFirstLogin = async () => {
  try {
    const hasSeenLogin = await AsyncStorage.getItem( "has_seen_login" );
    if ( hasSeenLogin === null ) {
      setSeenLogin();
      return true;
    }
    return false;
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

export {
  saveAccessToken,
  fetchAccessToken,
  removeAccessToken,
  setIsLoggedIn,
  checkIsEmailValid,
  checkIsUsernameValid,
  setSeenLogin,
  checkIfFirstLogin,
  savePostingSuccess,
  fetchPostingSuccess
};
