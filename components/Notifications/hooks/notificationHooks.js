// @flow

import { useState, useEffect } from "react";
import Realm from "realm";

import realmConfig from "../../../models";

const useFetchNotifications = ( ): any => {
  const [notifications, setNotifications] = useState( [] );

  useEffect( ( ) => {
    const fetchNotifications = async ( ) => {
      try {
        const realm = await Realm.open( realmConfig );
        const notificationList = realm.objects( "NotificationRealm" ).sorted( "index", true );
        setNotifications( notificationList );
      } catch ( e ) {
        console.log( e, "couldn't open realm: notifications" );
      }
    };
    fetchNotifications( );
  }, [] );

  return notifications;
};

export default useFetchNotifications;
