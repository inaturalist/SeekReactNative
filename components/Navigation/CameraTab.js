// @flow

import * as React from "react";
import { Dimensions, I18nManager, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

import { viewStyles, textStyles } from "../../styles/navigation";
import i18n from "../../i18n";
import ARCamera from "../Camera/ARCamera/ARCamera";
import LegacyARCamera from "../Camera/ARCamera/LegacyARCamera";
import Gallery from "../Camera/Gallery/GalleryScreen";
import { baseTextStyles } from "../../styles/textStyles";

type TabParamList = {
  ARCamera: void;
  Gallery: void;
};

type Props = MaterialTopTabBarProps<TabParamList>;

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get( "window" );

const screenOptions = {
  tabBarLabelStyle: [baseTextStyles.button, textStyles.cameraTabLabel],
  tabBarStyle: viewStyles.cameraTab,
  tabBarIndicatorStyle: viewStyles.indicator,
  swipeEnabled: ( I18nManager.isRTL && Platform.OS === "ios" ) ? true : false
};

const initialLayout = { width, length: height };

const isAndroid = Platform.OS === "android";
const majorVersionIOS = parseInt( Platform.Version, 10 );
const useVisionCamera = isAndroid ? Platform.Version >= 21 : majorVersionIOS >= 11;

const CameraNav = ( ): Props => (
  <Tab.Navigator
    tabBarPosition="bottom"
    initialLayout={initialLayout}
    screenOptions={screenOptions}
  >
    <Tab.Screen
      name="ARCamera"
      component={useVisionCamera ? ARCamera : LegacyARCamera}
      // moving these to a constant means that language doesn't switch correctly
      options={{ tabBarLabel: i18n.t( "camera.label" ).toLocaleUpperCase() }}
    />
    <Tab.Screen
      name="Gallery"
      component={Gallery}
      options={{
        tabBarLabel: i18n.t( "gallery.label" ).toLocaleUpperCase(),
        lazy: true
      }}
    />
  </Tab.Navigator>
);

export default CameraNav;
