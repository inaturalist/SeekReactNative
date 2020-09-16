import * as React from "react";
import { Platform, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styles from "../../styles/navigation";
import i18n from "../../i18n";
import ARCamera from "../Camera/ARCamera/ARCamera";
import Gallery from "../Camera/Gallery/GalleryScreen";

const Tab = createMaterialTopTabNavigator();

const { width, length } = Dimensions.get( "window" );

const CameraNav = () => (
  <Tab.Navigator
    tabBarPosition="bottom"
    swipeEnabled={Platform.OS === "ios"}
    initialLayout={{ width, length }}
    tabBarOptions={{
      labelStyle: styles.cameraTabLabel,
      style: styles.cameraTab,
      indicatorStyle: styles.indicator
    }}
    // AR Camera is already a memory intensive screen
    // lazy means the gallery is not loading at the same time
    lazy
  >
    <Tab.Screen
      name="ARCamera"
      component={ARCamera}
      initialParams={{ showWarning: false }} // this is only used for hot starting QuickActions
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
