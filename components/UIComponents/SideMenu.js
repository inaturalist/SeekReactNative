// @flow

import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";
import { useNavigation, useNavigationState } from "react-navigation-hooks";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";

const SideMenu = ( props ) => {
  // const { navigate } = useNavigation();
  const otherRouteName = useNavigationState().routeName;
  console.log( otherRouteName, "other route name" );

  const { navigation } = props;
  const activeRoute = props.items.find( it => it.key === props.activeItemKey );
  console.log( activeRoute.routes[0], "activeRoute" );
  const { index, routes } = activeRoute.routes[0];
  const { routeName } = routes[index];

  const navigateOrCloseDrawer = ( route ) => {
    if ( routeName === route ) {
      navigation.closeDrawer();
    } else {
      navigation.navigate( route );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity
        onPress={() => navigateOrCloseDrawer( "Main" )}
      >
        <Image
          source={logoImages.seek}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => navigateOrCloseDrawer( "Main" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuHome} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.home" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigateOrCloseDrawer( "Achievements" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuAchievements} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.achievements" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigateOrCloseDrawer( "Challenges" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuChallenges} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.challenges" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigateOrCloseDrawer( "MyObservations" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuObservations} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.observations" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigateOrCloseDrawer( "iNatStats" )}
          style={[styles.row, styles.height]}
        >
          <Image source={icons.menuiNat} style={styles.image} />
          <Text adjustsFontSizeToFit style={styles.text}>
            {i18n.t( "menu.inat" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => navigateOrCloseDrawer( "About" )}
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
