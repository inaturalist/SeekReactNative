const { AsyncStorage } = require( "react-native" );

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

export {
  saveAccessToken,
  fetchAccessToken,
  setIsLoggedIn,
  checkIsEmailValid,
  checkIsUsernameValid
};
