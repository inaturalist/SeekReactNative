// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/home/sideMenu";
import { colors } from "../../styles/global";
import logoImages from "../../assets/logos";

type Props = {
  navigation: any
}

const SideMenu = ( { navigation }: Props ) => (
  <LinearGradient
    colors={[colors.seekGreen, colors.seekTeal]}
    style={styles.container}
  >
    <SafeAreaView />
    <TouchableOpacity
      onPress={() => navigation.navigate( "Main" )}
    >
      <Image
        source={logoImages.seek}
        style={styles.image}
      />
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main" )}
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
        onPress={() => navigation.navigate( "Challenges" )}
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
        onPress={() => navigation.navigate( "iNatStats" )}
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
        onPress={() => navigation.navigate( "Onboarding" )}
      >
        <Text style={styles.text}>
          Onboarding
        </Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default SideMenu;
