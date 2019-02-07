const Realm = require( "realm" );

const realmConfig = require( "../models/index" );
const notificationDict = require( "./notificationDict" );

const createNotification = ( type, index ) => {
  console.log( "creating a notification" );
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const notifications = realm.objects( "NotificationRealm" );

      realm.write( () => {
        const newNotification = notificationDict.default[type];
        const notification = realm.create( "NotificationRealm", {
          title: newNotification.title,
          message: newNotification.message,
          iconName: newNotification.iconName,
          nextScreen: newNotification.nextScreen,
          challengeIndex: type === "challengeProgress" ? index : null,
          index: notifications.length
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to create notification: ", err );
    } );
};

export {
  createNotification
};
