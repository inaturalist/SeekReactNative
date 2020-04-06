import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Footer from "../UIComponents/Footer";

import CameraNav from "./CameraTab";
import FooterTabNav from "./FooterTabs";

import OfflineARResults from "../Results/OfflineARResults";
import OnlineServerResults from "../Results/OnlineServerResults";
import Match from "../Match/MatchScreen";
import RangeMap from "../Species/RangeMap";
import Notifications from "../Notifications/Notifications";
import CameraHelp from "../Camera/CameraHelpScreen";
import Post from "../PostToiNat/PostScreen";
import PostingHelp from "../PostToiNat/PostingHelpScreen";
import Wikipedia from "../Species/WikipediaView";

const Tab = createBottomTabNavigator();

const NotificationsFooter = () => (
  <Tab.Navigator tabBar={props => <Footer {...props} />}>
    <Tab.Screen name="Notifications" component={Notifications} />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultConfig = {
  headerShown: false,
  cardStyleInterpolator: forFade
};

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="MainStack"
    screenOptions={{ gestureEnabled: false }}
  >
    <Stack.Screen
      name="MainTab"
      component={FooterTabNav}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsFooter}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    />
    <Stack.Screen
      name="CameraHelp"
      component={CameraHelp}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Camera"
      component={CameraNav}
      options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
    />
    <Stack.Screen
      name="OfflineARResults"
      component={OfflineARResults}
      options={defaultConfig}
    />
    <Stack.Screen
      name="OnlineServerResults"
      component={OnlineServerResults}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Match"
      component={Match}
      options={defaultConfig}
    />
    <Stack.Screen // turn range map into modal, since it only pops up from species screen
      name="RangeMap"
      component={RangeMap}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Post"
      component={Post}
      options={defaultConfig}
    />
    <Stack.Screen
      name="PostingHelp"
      component={PostingHelp}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Wikipedia"
      component={Wikipedia}
      options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
    />
  </Stack.Navigator>
);

export default MainStack;
