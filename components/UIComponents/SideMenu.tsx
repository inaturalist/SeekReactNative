import * as React from "react";
import { Image, Pressable, View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, imageStyles, textStyles } from "../../styles/uiComponents/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";
import { capitalizeNames, setRoute, StoredRoutes } from "../../utility/helpers";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

const SideMenu = ( { navigation } ) => {
  const { navigate, popTo } = navigation;
  const menuItems = ["home", "achievements", "challenges", "observations", "inat", "about", "settings"];

  const navToPath = ( path: string ) => {
    if ( path === "Observations" ) {
      setRoute( StoredRoutes.SideMenu );
    }
    navigate( path );
  };

  const renderMenuItems = ( ) => menuItems.map( ( item, i ) => {
    const titleCase = capitalizeNames( item ) || "";
    const name = ( item === "inat" ? "iNaturalist" : i18n.t( `menu.${item}` ) ).toLocaleUpperCase();
    const path = item === "inat" ? "iNatStats" : titleCase;

    return (
      <Pressable
        key={item}
        accessibilityLabel={name}
        accessible
        onPress={( ) => navToPath( path )}
        style={[viewStyles.menuItem, i < menuItems.length - 1 && viewStyles.divider]}
      >
        <Image
          source={icons[`menu${titleCase}`]}
          style={imageStyles.icon}
        />
        <StyledText allowFontScaling={false} style={[baseTextStyles.sideMenu, textStyles.text]}>{name}</StyledText>
      </Pressable>
    );
  } );

  return (
    <View testID="side-menu" style={viewStyles.container}>
      <Pressable
        accessibilityLabel={i18n.t( "menu.home" )}
        accessible
        // Home should definitively be in the stack, as it is the initial route of the app.
        // So we can just pop back to it.
        onPress={( ) => popTo( "Home" )}
      >
        <Image source={logoImages.seek} style={imageStyles.seekLogo} />
      </Pressable>
      {renderMenuItems( )}
    </View>
  );
};

export default SideMenu;
