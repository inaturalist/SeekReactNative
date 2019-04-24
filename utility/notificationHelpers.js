const Realm = require( "realm" );

const realmConfig = require( "../models/index" );
const notificationDict = require( "./notificationDict" );

const createNotification = ( type, challengeIndex ) => {
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
          challengeIndex,
          index: notifications.length,
          seen: false
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to create notification: ", err );
    } );
};

const updateNotifications = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const notifications = realm.objects( "NotificationRealm" );

      notifications.forEach( ( notification ) => {
        if ( notification.seen === false ) {
          realm.write( () => {
            notification.seen = true;
          } );
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to create notification: ", err );
    } );
};

export {
  createNotification,
  updateNotifications
};
