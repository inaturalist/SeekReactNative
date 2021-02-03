// @flow

import React from "react";
import { Image, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";
import { capitalizeNames, setRoute } from "../../utility/helpers";
import { colors } from "../../styles/global";

const SideMenu = ( ) => {
  const { navigate } = useNavigation();
  const menuItems = ["home", "achievements", "challenges", "observations", "inat", "about", "settings"];

  // need the long version of this for QuickActions to Seek AR Camera
  const navHome = ( ) => navigate( "MainTab", { screen: "Home" } );

  const navToPath = ( path ) => {
    if ( path === "Home" ) {
      navHome( );
    } else {
      if ( path === "Observations" ) {
        setRoute( "SideMenu" );
      }
      navigate( path );
    }
  };

  const renderMenuItems = ( ) => menuItems.map( ( item, i ) => {
    const titleCase = capitalizeNames( item ) || "";
    const name = i18n.t( `menu.${item}` ).toLocaleUpperCase();
    const path = item === "inat" ? "iNatStats" : titleCase;

    return (
      <Pressable
        key={item}
        accessibilityLabel={name}
        accessible
        onPress={() => navToPath( path )}
        style={[styles.menuItem, i < menuItems.length - 1 && styles.divider]}
      >
        {/* $FlowFixMe */}
        <Image
          source={icons[`menu${titleCase}`]}
          style={styles.icon}
          tintColor={colors.menuItems}
        />
        <Text allowFontScaling={false} style={styles.text}>{name}</Text>
      </Pressable>
    );
  } );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        accessibilityLabel={i18n.t( "menu.home" )}
        accessible
        onPress={navHome}
      >
        <Image source={logoImages.seek} style={styles.seekLogo} />
      </Pressable>
      {renderMenuItems( )}
    </SafeAreaView>
  );
};

export default SideMenu;
