// @flow
import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { viewStyles } from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import backgrounds from "../../assets/backgrounds";

type Props = {
  +openFlagModal: Function,
  +setNavigationPath: Function
}

const MatchFooter = ( { openFlagModal, setNavigationPath }: Props ): React.Node => (
  <SafeAreaView style={viewStyles.safeArea} edges={["right", "bottom", "left"]}>
    <ImageBackground source={backgrounds.navBar} style={viewStyles.container}>
      <View style={[viewStyles.navbar, viewStyles.row, viewStyles.shadow]}>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.menu" )}
          accessible
          onPress={() => setNavigationPath( "Drawer" )}
          style={viewStyles.leftIcon}
        >
          <Image source={icons.hamburger} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.camera" )}
          accessible
          onPress={() => setNavigationPath( "Camera" )}
          style={viewStyles.camera}
        >
          <Image source={icons.cameraGreen} style={viewStyles.cameraImage} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.flag" )}
          accessible
          onPress={() => openFlagModal()}
          style={viewStyles.flagPadding}
        >
          <Image source={icons.flag} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

export default MatchFooter;
