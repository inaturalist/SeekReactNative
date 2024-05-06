import Realm from "realm";

import realmConfig from "../models/index";
import notificationDict from "./dictionaries/notificationDict";

const createNotification = ( type: string, challengeIndex?: number ) => {
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
        seen: false,
        viewed: false
      } );
    } );
  } ).catch( ( err ) => {
    console.log( "[DEBUG] Failed to create notification: ", err );
  } );
};

const markNotificationAsSeen = ( index: number ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
    const notification = realm.objects( "NotificationRealm" ).filtered( `index == ${index}` )[0];
    realm.write( () => {
      notification.seen = true;
    } );
  } ).catch( ( err ) => {
    console.log( "[DEBUG] Failed to create notification: ", err );
  } );
};

const markNotificationsAsViewed = () => {
  // mark all notifications viewed when a user navigates to Notification Screen
  Realm.open( realmConfig ).then( ( realm ) => {
    const notifications = realm.objects( "NotificationRealm" );

    notifications.forEach( ( notification ) => {
      // past notifications will not have this object key
      if ( notification.viewed === false ) {
        realm.write( () => {
          notification.viewed = true;
        } );
      }
    } );
  } ).catch( ( err ) => {
    console.log( "[DEBUG] Failed to create notification: ", err );
  } );
};

const isDuplicateNotification = ( realm: Realm, i: number ): boolean => {
  const notification = realm.objects( "NotificationRealm" )
    .filtered( `title == "notifications.new_challenge" AND challengeIndex == ${i}` );
  if ( notification.length > 0 ) {
    return true;
  }
  return false;
};

export {
  createNotification,
  markNotificationAsSeen,
  markNotificationsAsViewed,
  isDuplicateNotification
};
