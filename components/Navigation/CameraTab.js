import * as React from "react";
import { Platform, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styles from "../../styles/navigation";
import i18n from "../../i18n";
import ARCamera from "../Camera/ARCamera/ARCamera";
import Gallery from "../Camera/Gallery/GalleryScreen";

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get( "window" );

const CameraNav = () => (
  <Tab.Navigator
    tabBarPosition="bottom"
    swipeEnabled={Platform.OS === "ios"}
    initialLayout={{
      width,
      height
    }}
    tabBarOptions={{
      scrollEnabled: true,
      labelStyle: styles.cameraTabLabel,
      style: styles.cameraTab,
      indicatorStyle: styles.indicator
    }}
  >
    <Tab.Screen
      name="ARCamera"
      component={ARCamera}
      options={{ tabBarLabel: i18n.t( "camera.label" ).toLocaleUpperCase() }}
    />
    <Tab.Screen
      name="Gallery"
      component={Gallery}
      options={{ tabBarLabel: i18n.t( "gallery.label" ).toLocaleUpperCase() }}
    />
  </Tab.Navigator>
);

export default CameraNav;
