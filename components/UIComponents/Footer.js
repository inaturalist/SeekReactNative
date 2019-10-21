// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView
} from "react-native";
import Realm from "realm";

import realmConfig from "../../models";
import styles from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import backgrounds from "../../assets/backgrounds";

type Props = {
  +navigation: any
}

const Footer = ( { navigation }: Props ) => {
  const [notifications, setNotifications] = useState( false );

  const fetchNotifications = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const newNotifications = realm.objects( "NotificationRealm" ).filtered( "seen == false" ).length;
        if ( newNotifications > 0 ) {
          setNotifications( true );
        } else {
          setNotifications( false );
        }
      } ).catch( () => {
        console.log( "[DEBUG] Failed to fetch notifications: " );
      } );
  };

  useEffect( () => {
    fetchNotifications();
  } );

  return (
    <SafeAreaView>
      <ImageBackground source={backgrounds.navBar} style={styles.container}>
        <View style={[styles.navbar, styles.row]}>
          <TouchableOpacity
            hitSlop={styles.touchable}
            onPress={() => navigation.openDrawer()}
            style={styles.leftIcon}
          >
            <Image source={icons.hamburger} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate( "Camera" )}>
            <Image source={icons.cameraGreen} style={styles.cameraImage} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={styles.touchable}
            onPress={() => navigation.navigate( "Notifications" )}
            style={[styles.rightIcon, styles.notificationPadding]}
          >
            {notifications
              ? <Image source={icons.notifications} />
              : <Image source={icons.notificationsInactive} />}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Footer;
