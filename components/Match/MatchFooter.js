// @flow
import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import backgrounds from "../../assets/backgrounds";

type Props = {
  +openFlagModal: Function,
  +setNavigationPath: Function
}

const MatchFooter = ( { openFlagModal, setNavigationPath }: Props ) => (
  <SafeAreaView style={styles.safeArea} edges={["right", "bottom", "left"]}>
    <ImageBackground source={backgrounds.navBar} style={styles.container}>
      <View style={[styles.navbar, styles.row]}>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.menu" )}
          accessible
          onPress={() => setNavigationPath( "Drawer" )}
          style={styles.leftIcon}
        >
          <Image source={icons.hamburger} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.camera" )}
          accessible
          onPress={() => setNavigationPath( "Camera" )}
          style={styles.camera}
        >
          <Image source={icons.cameraGreen} style={styles.cameraImage} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.flag" )}
          accessible
          onPress={() => openFlagModal()}
          style={styles.flagPadding}
        >
          <Image source={icons.flag} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

export default MatchFooter;
