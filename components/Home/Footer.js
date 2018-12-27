import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import BellIcon from "react-native-vector-icons/MaterialIcons";
import MenuIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CameraIcon from "react-native-vector-icons/Entypo";

import styles from "../../styles/footer";
import { colors } from "../../styles/global";

const notifications = ( <BellIcon name="notifications" size={30} color={colors.white} /> );
const hamburgerMenu = ( <MenuIcon name="menu" size={30} color={colors.white} /> );
const camera = ( <CameraIcon name="camera" size={40} color={colors.white} /> );

const Footer = () => (
  <View style={styles.container}>
    <View style={styles.coloredBar}>
      <TouchableOpacity>
        <Text>
          {hamburgerMenu}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
