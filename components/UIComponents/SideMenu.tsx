import * as React from "react";
import { Image, Pressable, View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, imageStyles, textStyles } from "../../styles/uiComponents/sideMenu";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";
import { capitalizeNames, setRoute } from "../../utility/helpers";
import { resetRouter } from "../../utility/navigationHelpers";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

const SideMenu = ( { navigation } ) => {
  const { navigate } = navigation;
  const menuItems = ["home", "achievements", "challenges", "observations", "inat", "about", "settings"];

  const navHome = ( ) => resetRouter( navigation );

  const navToPath = ( path: string ) => {
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
    const name = ( item === "inat" ? "iNaturalist" : i18n.t( `menu.${item}` ) ).toLocaleUpperCase();
    const path = item === "inat" ? "iNatStats" : titleCase;

    return (
      <Pressable
        key={item}
        accessibilityLabel={name}
        accessible
        onPress={() => navToPath( path )}
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
        onPress={navHome}
      >
        <Image source={logoImages.seek} style={imageStyles.seekLogo} />
      </Pressable>
      {renderMenuItems( )}
    </View>
  );
};

export default SideMenu;
