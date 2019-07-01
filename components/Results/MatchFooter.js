// @flow
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView
} from "react-native";

import styles from "../../styles/home/footer";
import icons from "../../assets/icons";
import backgrounds from "../../assets/backgrounds";

type Props = {
  navigation: any,
  toggleFlagModal: Function
}

const MatchFooter = ( { navigation, toggleFlagModal }: Props ) => (
  <SafeAreaView>
    <ImageBackground source={backgrounds.navBar} style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          hitSlop={styles.touchable}
          style={styles.button}
          onPress={() => navigation.openDrawer()}
        >
          <Image source={icons.hamburger} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate( "Camera" )}>
          <Image source={icons.cameraGreen} style={styles.cameraImage} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={styles.touchable}
          style={styles.button}
          onPress={() => toggleFlagModal()}
        >
          <Image source={icons.birdTeal} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

export default MatchFooter;
