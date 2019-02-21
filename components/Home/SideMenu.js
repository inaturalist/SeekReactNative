// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";

type Props = {
  navigation: any
}

const SideMenu = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView />
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate( "Main" )}
    >
      <Image
        source={logoImages.seek}
        style={styles.logo}
      />
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "Main" )}
      >
        <Image source={icons.menuHome} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "menu.home" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "Badges" )}
      >
        <Image source={icons.menuAchievements} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "menu.achievements" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "Challenges" )}
      >
        <Image source={icons.menuChallenges} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "menu.challenges" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "MyObservations" )}
      >
        <Image source={icons.menuObservations} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "menu.observations" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "iNatStats" )}
      >
        <Image source={icons.menuiNat} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "menu.inat" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "About" )}
      >
        <Image source={icons.menuSeek} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "menu.about" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate( "Onboarding" )}
      >
        <Image source={icons.menuSettings} style={styles.image} />
        <Text style={styles.text}>
          ONBOARDING
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default SideMenu;
