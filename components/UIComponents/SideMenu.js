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
import styles from "../../styles/uiComponents/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";
import { capitalizeNames, setRoute } from "../../utility/helpers";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

const SideMenu = ( { navigation }: Props ) => {
  const menuItems = ["home", "achievements", "challenges", "observations", "inat", "about", "settings"];

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity
        accessibilityLabel={i18n.t( "menu.home" )}
        accessible
        // need the long version of this for QuickActions to Seek AR Camera
        onPress={() => navigation.navigate( "MainTab", { screen: "Home" } )}
      >
        <Image source={logoImages.seek} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {menuItems.map( ( item ) => {
          const name = i18n.t( `menu.${item}` ).toLocaleUpperCase();

          let path;

          if ( item === "inat" ) {
            path = "iNatStats";
          } else {
            path = capitalizeNames( item );
          }

          return (
            <React.Fragment key={item}>
              <TouchableOpacity
                accessibilityLabel={name}
                accessible
                onPress={() => {
                  if ( path === "Observations" ) {
                    setRoute( "SideMenu" );
                    navigation.navigate( path );
                  } else if ( path === "Home" ) {
                    // need the long version of this for QuickActions to Seek AR Camera
                    navigation.navigate( "MainTab", { screen: "Home" } );
                  } else {
                    navigation.navigate( path );
                  }
                }}
                style={[styles.row, styles.height]}
              >
                <Image
                  source={icons[`menu${capitalizeNames( item )}`]}
                  style={styles.image}
                  tintColor={colors.menuItems}
                />
                <Text allowFontScaling={false} style={styles.text}>{name}</Text>
              </TouchableOpacity>
              {item !== "settings" && <View style={styles.divider} />}
            </React.Fragment>
          );
        } )}
      </View>
    </View>
  );
};

export default SideMenu;
