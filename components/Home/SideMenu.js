// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";

import styles from "../../styles/home/menu";
import logoImages from "../../assets/logos";

type Props = {
  navigation: any
}

const SideMenu = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.textContainer}>
        <Image source={logoImages.seek} />
        <TouchableOpacity
          onPress={() => navigation.navigate( "Main", {
            taxaName: null,
            id: null,
            taxaType: "all",
            latitude: null,
            longitude: null
          } )}
        >
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Badges" )}
        >
          <Text style={styles.text}>Profile & Badges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "YourCollection" )}
        >
          <Text style={styles.text}>Observations</Text>
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

export default SideMenu;
