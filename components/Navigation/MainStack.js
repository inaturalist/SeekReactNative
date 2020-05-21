import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Footer from "../UIComponents/Footer";
import FooterTabNav from "./FooterTabs";
import Match from "../Match/MatchScreen";
import Notifications from "../Notifications/Notifications";

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
      name="Match"
      component={Match}
      options={defaultConfig}
    />
  </Stack.Navigator>
);

export default MainStack;
