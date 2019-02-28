// @flow

import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/home/footer";
import icons from "../../assets/icons";

type Props = {
  navigation: any
}

const Footer = ( { navigation }: Props ) => (
  <ImageBackground source={icons.navbarShadow} style={styles.container}>
    {/* <LinearGradient
      colors={["#ffffff", "#d8d8d8"]}
      style={{ height: 3 }}
    /> */}
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Image source={icons.hamburger} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push( "Camera" )}>
        <Image source={icons.cameraGreen} style={styles.cameraImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if ( navigation.state.routeName !== "iNatStats" ) {
            navigation.push( "iNatStats" );
          }
        }}
      >
        <Image source={icons.birdTeal} style={{ width: 36, height: 29, resizeMode: "contain" }} />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default Footer;
