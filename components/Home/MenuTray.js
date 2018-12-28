// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";

import styles from "../../styles/home/menu";

type Props = {
  navigation: any
}

const MenuTray = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.textContainer}>
        <Image source={require( "../../assets/logos/logo-seek-splash.png" )} />
        <TouchableOpacity
          onPress={() => navigation.navigate( "Main" )}
        >
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "YourCollection" )}
        >
          <Text style={styles.text}>Your Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "About" )}
        >
          <Text style={styles.text}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default MenuTray;
