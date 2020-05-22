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
        onPress={() => navigation.navigate( "Home" )}
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
                  }
                  navigation.navigate( path );
                }}
                style={[styles.row, styles.height]}
              >
                <Image source={icons[`menu${capitalizeNames( item )}`]} style={styles.image} />
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
