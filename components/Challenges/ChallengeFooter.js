// @flow
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView
} from "react-native";
import { NavigationTabScreenProps } from "react-navigation-tabs";

import styles from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import backgrounds from "../../assets/backgrounds";
import { setRoute } from "../../utility/helpers";

const ChallengeFooter = ( { navigation }: NavigationTabScreenProps ) => (
  <SafeAreaView style={styles.safeArea}>
    <ImageBackground source={backgrounds.navBar} style={styles.container}>
      <View style={[styles.navbar, styles.row]}>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.menu" )}
          accessible
          onPress={() => navigation.openDrawer()}
          style={styles.leftIcon}
        >
          <Image source={icons.hamburger} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.camera" )}
          accessible
          onPress={() => navigation.navigate( "Camera" )}
          style={styles.camera}
        >
          <Image source={icons.cameraGreen} style={styles.cameraImage} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.iNatStats" )}
          accessible
          onPress={() => {
            setRoute( "Challenges" );
            navigation.navigate( "iNatStats" );
          }}
          style={styles.rightIcon}
        >
          <Image source={icons.birdTeal} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

export default ChallengeFooter;
