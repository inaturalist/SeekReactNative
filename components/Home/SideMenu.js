// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";
import { useNavigation } from "react-navigation-hooks";

import i18n from "../../i18n";
import styles from "../../styles/home/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";

const SideMenu = ( props ) => {
  const { navigate } = useNavigation();
  const activeRoute = props.items.find( it => it.key === props.activeItemKey );
  // console.log( props, "props" );
  // console.log( activeRoute.routes[0], "props" );
  // console.log( activeRoute.routes[0].index, "props" );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity
        onPress={() => navigate( "Main" )}
      >
        <Image
          source={logoImages.seek}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => navigate( "Main" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuHome} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.home" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigate( "Achievements" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuAchievements} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.achievements" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigate( "Challenges" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuChallenges} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.challenges" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigate( "MyObservations" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuObservations} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.observations" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigate( "iNatStats" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuiNat} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.inat" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigate( "About" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuSeek} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.about" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SideMenu;
