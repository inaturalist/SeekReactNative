// @flow

import * as React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

import { viewStyles, textStyles } from "../../styles/navigation";
import i18n from "../../i18n";
import ARCamera from "../Camera/ARCamera/ARCamera";
import Gallery from "../Camera/Gallery/GalleryScreen";
import CameraIndicator from "./CameraIndicator";

type TabParamList = {
  ARCamera: void;
  Gallery: void;
};

type Props = MaterialTopTabBarProps<TabParamList>;

const Tab = createMaterialTopTabNavigator();

const { width, length } = Dimensions.get( "window" );

<<<<<<< HEAD
const screenOptions = {
  tabBarLabelStyle: textStyles.cameraTabLabel,
  tabBarStyle: viewStyles.cameraTab,
  tabBarIndicatorStyle: viewStyles.indicator,
  swipeEnabled: false
=======
const tabBarOptions = {
  labelStyle: textStyles.cameraTabLabel,
  style: viewStyles.cameraTab,
  renderIndicator: props => {
    const { index } = props.navigationState;
    return <CameraIndicator index={index} />;
  }
>>>>>>> main
};

const initialLayout = { width, length };

const CameraNav = ( ): Props => (
  <Tab.Navigator
    tabBarPosition="bottom"
    initialLayout={initialLayout}
    screenOptions={screenOptions}
  >
    <Tab.Screen
      name="ARCamera"
      component={ARCamera}
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
