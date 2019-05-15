const Realm = require( "realm" );
const { AsyncStorage } = require( "react-native" );

const realmConfig = require( "../models/index" );

const checkIsEmailValid = ( email ) => {
  if ( email.length > 5 ) {
    if ( email.includes( "@" ) && email.includes( "." ) ) {
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

// const saveAccessToken = ( token ) => {
//   Realm.open( realmConfig.default )
//     .then( ( realm ) => {
//       realm.delete( realm.objects( "LoginRealm" ) );
//       realm.write( () => {
//         const login = realm.create( "LoginRealm", {
//           access_token: token,
//           index: 1
//         } );
//       } );
//     } ).catch( ( err ) => {
//       console.log( "[DEBUG] Failed to save access token: ", err );
//     } );
// };

const checkIsLoggedIn = () => (
  new Promise( ( resolve ) => {
    Realm.open( realmConfig.default )
      .then( ( realm ) => {
        const login = realm.objects( "LoginRealm" );
        resolve( login );
      } ).catch( ( err ) => {
        resolve( err );
      } );
  } )
  // try {
  //   const isLoggedIn = await AsyncStorage.getItem( "logged_in" );
  //   return isLoggedIn;
  // } catch ( error ) {
  //   return false;
  // }
);

export {
  saveAccessToken,
  fetchAccessToken,
  setIsLoggedIn,
  checkIsLoggedIn,
  checkIsEmailValid
};
