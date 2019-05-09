const Realm = require( "realm" );
const { Alert } = require( "react-native" );

const realmConfig = require( "../models/index" );

const saveAccessToken = ( token ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        realm.create( "LoginRealm", {
          access_token: token
        } );
      } );
      Alert.alert( token );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to save access token: ", err );
    } );
};

export {
  saveAccessToken
};
