import * as React from "react";
import { Platform, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styles from "../../styles/navigation";
import i18n from "../../i18n";
import ARCamera from "../Camera/ARCamera/ARCamera";
import Gallery from "../Camera/Gallery/GalleryScreen";

const Tab = createMaterialTopTabNavigator();

const { width, length } = Dimensions.get( "window" );

const tabBarOptions = {
  labelStyle: styles.cameraTabLabel,
  style: styles.cameraTab,
  indicatorStyle: styles.indicator
};

const initialLayout = { width, length };

const swipeEnabled = Platform.OS === "ios" || false;

// this is only used for hot starting QuickActions
const initialCameraParams = { showWarning: false };

const cameraLabel = { tabBarLabel: i18n.t( "camera.label" ).toLocaleUpperCase() };
const galleryLabel = { tabBarLabel: i18n.t( "gallery.label" ).toLocaleUpperCase() };

const CameraNav = () => (
  <Tab.Navigator
    tabBarPosition="bottom"
    swipeEnabled={swipeEnabled}
    initialLayout={initialLayout}
    tabBarOptions={tabBarOptions}
    // AR Camera is already a memory intensive screen
    // lazy means the gallery is not loading at the same time
    lazy
  >
    <Tab.Screen
      name="ARCamera"
      component={ARCamera}
      initialParams={initialCameraParams}
      options={cameraLabel}
    />
    <Tab.Screen
      name="Gallery"
      component={Gallery}
      options={galleryLabel}
    />
  </Tab.Navigator>
);

export default CameraNav;
