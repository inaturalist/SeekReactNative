// @flow

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import BellIcon from "react-native-vector-icons/MaterialIcons";
import MenuIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CameraIcon from "react-native-vector-icons/Entypo";

import styles from "../../styles/home/footer";
import { colors } from "../../styles/global";

const notifications = ( <BellIcon name="notifications" size={30} color={colors.white} /> );
const hamburgerMenu = ( <MenuIcon name="menu" size={30} color={colors.white} /> );
const camera = ( <CameraIcon name="camera" size={40} color={colors.white} /> );

type Props = {
  navigation: any,
  latitude: number,
  longitude: number
}

const Footer = ( { navigation, latitude, longitude }: Props ) => (
  <View style={styles.container}>
    <View style={styles.coloredBar}>
      <TouchableOpacity onPress={() => navigation.navigate( "Menu" )}>
        <Text>
          {hamburgerMenu}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push( "Camera", {
        latitude,
        longitude,
        id: null,
        commonName: null
      } )}
      >
        <Text>
          {camera}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>
          {notifications}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Footer;
