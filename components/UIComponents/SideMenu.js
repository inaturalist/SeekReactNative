// @flow

import React, { Component } from "react";
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
import { setRoute } from "../../utility/helpers";

type Props = {
  +navigation: any
}

class SideMenu extends Component<Props> {
  navigateTo( route: string ) {
    const { navigation } = this.props;

    navigation.navigate( route );
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <TouchableOpacity
          accessibilityLabel={i18n.t( "menu.home" )}
          accessible
          onPress={() => this.navigateTo( "Main" )}
        >
          <Image
            source={logoImages.seek}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "menu.home" )}
            accessible
            onPress={() => this.navigateTo( "Main" )}
            style={[styles.row, styles.height]}
          >
            <Image source={icons.menuHome} style={styles.image} />
            <Text adjustsFontSizeToFit style={styles.text}>
              {i18n.t( "menu.home" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            accessibilityLabel={i18n.t( "menu.achievements" )}
            accessible
            onPress={() => this.navigateTo( "Achievements" )}
            style={[styles.row, styles.height]}
          >
            <Image source={icons.menuAchievements} style={styles.image} />
            <Text adjustsFontSizeToFit style={styles.text}>
              {i18n.t( "menu.achievements" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            accessibilityLabel={i18n.t( "menu.challenges" )}
            accessible
            onPress={() => this.navigateTo( "Challenges" )}
            style={[styles.row, styles.height]}
          >
            <Image source={icons.menuChallenges} style={styles.image} />
            <Text adjustsFontSizeToFit style={styles.text}>
              {i18n.t( "menu.challenges" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            accessibilityLabel={i18n.t( "menu.observations" )}
            accessible
            onPress={() => this.navigateTo( "MyObservations" )}
            style={[styles.row, styles.height]}
          >
            <Image source={icons.menuObservations} style={styles.image} />
            <Text adjustsFontSizeToFit style={styles.text}>
              {i18n.t( "menu.observations" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            accessibilityLabel={i18n.t( "menu.inat" )}
            accessible
            onPress={() => {
              setRoute( "Main" );
              this.navigateTo( "iNatStats" );
            }}
            style={[styles.row, styles.height]}
          >
            <Image source={icons.menuiNat} style={styles.image} />
            <Text adjustsFontSizeToFit style={styles.text}>
              {i18n.t( "menu.inat" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            accessibilityLabel={i18n.t( "menu.about" )}
            accessible
            onPress={() => this.navigateTo( "About" )}
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
  }
}

export default SideMenu;
