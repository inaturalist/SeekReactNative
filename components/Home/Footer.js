// @flow

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import styles from "../../styles/home/footer";
import icons from "../../assets/icons";

type Props = {
  navigation: any,
  notifications: boolean
}

const Footer = ( {
  navigation,
  notifications
}: Props ) => (
  <View style={styles.container}>
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Image source={icons.hamburger} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push( "Camera" )}>
        <Image source={icons.cameraGreen} style={styles.cameraImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if ( navigation.state.routeName !== "Notifications" ) {
            navigation.push( "Notifications" );
          }
        }}
      >
        { notifications ? <Image source={icons.notifications} />
          : <Image source={icons.notificationsInactive} />
        }
      </TouchableOpacity>
    </View>
  </View>
);

export default Footer;
