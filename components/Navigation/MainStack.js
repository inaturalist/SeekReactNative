// @flow
import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Footer from "../UIComponents/Footer";
import FooterTabNav from "./FooterTabs";
import Match from "../Match/MatchScreen";
import Social from "../Social/SocialScreen";
import Notifications from "../Notifications/Notifications";

const Tab = createBottomTabNavigator();

const tabBar = props => <Footer {...props} />;

const NotificationsFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
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

const notificationsConfig = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
};

const screenOptions = { gestureEnabled: false };

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="MainStack"
    screenOptions={screenOptions}
  >
    <Stack.Screen
      name="MainTab"
      component={FooterTabNav}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsFooter}
      options={notificationsConfig}
    />
    <Stack.Screen
      name="Match"
      component={Match}
      options={defaultConfig}
    />
    <Stack.Screen
      name="Social"
      component={Social}
      options={defaultConfig}
    />
  </Stack.Navigator>
);

export default MainStack;
