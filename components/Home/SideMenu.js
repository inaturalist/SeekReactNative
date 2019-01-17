// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/home/menu";
import { colors } from "../../styles/global";
import logoImages from "../../assets/logos";

type Props = {
  navigation: any
}

const SideMenu = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <LinearGradient
      colors={[colors.seekGreen, colors.seekTeal]}
      style={styles.column}
    >
      <Image
        source={logoImages.seek}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Main", {
            taxaName: null,
            id: null,
            taxaType: "all",
            latitude: null,
            longitude: null
          } )}
        >
          <Text style={styles.text}>
            {i18n.t( "menu.home" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Badges" )}
        >
          <Text style={styles.text}>
            {i18n.t( "menu.profile" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log( "challenges clicked" )}
        >
          <Text style={styles.text}>
            {i18n.t( "menu.challenges" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "YourCollection" )}
        >
          <Text style={styles.text}>
            {i18n.t( "menu.observations" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log( "inaturalist stats clicked" )}
        >
          <Text style={styles.text}>
            {i18n.t( "menu.inat" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "About" )}
        >
          <Text style={styles.text}>
            {i18n.t( "menu.about" )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Login" )}
        >
          <Text style={styles.text}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
);

export default SideMenu;
