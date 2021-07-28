// @flow

import * as React from "react";
import { Platform, Dimensions, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

import { viewStyles, textStyles } from "../../styles/navigation";
import i18n from "../../i18n";
import ARCamera from "../Camera/ARCamera/ARCamera";
import Gallery from "../Camera/Gallery/GalleryScreen";

type TabParamList = {
  ARCamera: void;
  Gallery: void;
};

type Props = MaterialTopTabBarProps<TabParamList>;

const Tab = createMaterialTopTabNavigator();

const { width, length } = Dimensions.get( "window" );

const tabBarOptions = {
  labelStyle: textStyles.cameraTabLabel,
  style: viewStyles.cameraTab,
  renderIndicator: props => {
    const { index } = props.navigationState;

    if ( index === 0 ) {
      return <View style={viewStyles.indicator} />;
    } else {
      return <View style={viewStyles.galleryIndicator} />;
    }
  }
};

const initialLayout = { width, length };

// removing this since it was easy to swipe by accident in landscape while trying to tap camera
const swipeEnabled = false;
// const swipeEnabled = Platform.OS === "ios" || false;

const CameraNav = ( ): Props => (
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
      // moving these to a constant means that language doesn't switch correctly
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
