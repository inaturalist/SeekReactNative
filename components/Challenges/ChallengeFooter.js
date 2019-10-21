// @flow
import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView
} from "react-native";

import styles from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import backgrounds from "../../assets/backgrounds";

type Props = {
  +navigation: any
}

const ChallengeFooter = ( { navigation }: Props ) => (
  <SafeAreaView>
    <ImageBackground source={backgrounds.navBar} style={styles.container}>
      <View style={[styles.navbar, styles.row]}>
        <TouchableOpacity
          hitSlop={styles.touchable}
          onPress={() => navigation.openDrawer()}
          style={styles.leftIcon}
        >
          <Image source={icons.hamburger} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Camera" )}
          style={styles.camera}
        >
          <Image source={icons.cameraGreen} style={styles.cameraImage} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={styles.touchable}
          onPress={() => navigation.navigate( "iNatStats" )}
          style={styles.rightIcon}
        >
          <Image source={icons.birdTeal} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

export default ChallengeFooter;
