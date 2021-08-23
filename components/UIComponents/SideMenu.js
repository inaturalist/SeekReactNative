// @flow

import * as React from "react";
import { Image, Text, Pressable, View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, imageStyles, textStyles } from "../../styles/uiComponents/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";
import { capitalizeNames, setRoute } from "../../utility/helpers";
import { resetRouter } from "../../utility/navigationHelpers";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

const SideMenu = ( { navigation }: Props ): React.Node => {
  const { navigate } = navigation;
  const menuItems = ["home", "achievements", "challenges", "observations", "inat", "about", "settings"];

  const navHome = ( ) => resetRouter( navigation );

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
        style={[viewStyles.menuItem, i < menuItems.length - 1 && viewStyles.divider]}
      >
        {/* $FlowFixMe */}
        <Image
          source={icons[`menu${titleCase}`]}
          style={imageStyles.icon}
          tintColor={colors.menuItems}
        />
        <Text allowFontScaling={false} style={textStyles.text}>{name}</Text>
      </Pressable>
    );
  } );

  return (
    <View style={viewStyles.container}>
      <Pressable
        accessibilityLabel={i18n.t( "menu.home" )}
        accessible
        onPress={navHome}
      >
        <Image source={logoImages.seek} style={imageStyles.seekLogo} />
      </Pressable>
      {renderMenuItems( )}
    </View>
  );
};

export default SideMenu;
