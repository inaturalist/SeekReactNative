// @flow

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import styles from "../../styles/home/footer";
import icons from "../icons";

type Props = {
  navigation: any,
  latitude: number,
  longitude: number,
  notifications: boolean
}

const Footer = ( {
  navigation,
  latitude,
  longitude,
  notifications
}: Props ) => (
  <View style={styles.container}>
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate( "Menu" )}>
        <Image source={icons.hamburger} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push( "Camera", {
        latitude,
        longitude,
        id: null,
        commonName: null
      } )}
      >
        <Image source={icons.cameraGreen} style={styles.cameraImage} />
      </TouchableOpacity>
      <TouchableOpacity>
        { notifications ? <Image source={icons.notifications} />
          : <Image source={icons.notificationsInactive} />
        }
      </TouchableOpacity>
    </View>
  </View>
);

export default Footer;
