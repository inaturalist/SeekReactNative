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
import { NavigationTabScreenProps } from "react-navigation-tabs";
import { withNavigation } from "@react-navigation/compat";

import realmConfig from "../../models";
import styles from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import backgrounds from "../../assets/backgrounds";

const Footer = ( { navigation }: NavigationTabScreenProps ) => {
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
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgrounds.navBar} style={styles.container}>
        <View style={[styles.navbar, styles.row]}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.menu" )}
            accessible
            onPress={() => navigation.openDrawer()}
            style={styles.leftIcon}
          >
            <Image source={icons.hamburger} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.camera" )}
            accessible
            onPress={() => navigation.navigate( "Camera" )}
            style={styles.camera}
          >
            <Image source={icons.cameraGreen} style={styles.cameraImage} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.notifications" )}
            accessible
            onPress={() => navigation.navigate( "Notifications" )}
            style={styles.notificationPadding}
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

export default withNavigation( Footer );
