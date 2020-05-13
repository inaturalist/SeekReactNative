import Realm from "realm";

import realmConfig from "../models/index";
import notificationDict from "./dictionaries/notificationDict";

const createNotification = ( type, challengeIndex ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
    const notifications = realm.objects( "NotificationRealm" );

    realm.write( () => {
      const newNotification = notificationDict[type];
      realm.create( "NotificationRealm", {
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

const markNotificationAsSeen = ( index ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
    const notification = realm.objects( "NotificationRealm" ).filtered( `index == ${index}` )[0];
    console.log( notification, "notification seen" );
    realm.write( () => {
      notification.seen = true;
    } );
  } ).catch( ( err ) => {
    console.log( "[DEBUG] Failed to create notification: ", err );
  } );
};

export {
  createNotification,
  markNotificationAsSeen
};
