const Realm = require( "realm" );

const realmConfig = require( "../models/index" );
const notificationDict = require( "./notificationDict" );

const createNotification = ( type ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const notifications = realm.objects( "NotificationRealm" );
      console.log( notifications, "existing notifications in realm" );
      realm.write( () => {
        const newNotification = notificationDict.default[type];
        console.log( newNotification, "new notification in realm" );
        const notification = realm.create( "NotificationRealm", {
          title: newNotification.title,
          message: newNotification.message,
          iconName: newNotification.iconName,
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
