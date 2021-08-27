// @flow
import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Notifications from "../Notifications/Notifications";
import Footer from "../UIComponents/Footer";

type Props = {
  +props: any,
  +ref: any,
  +type: any,
  +key: any
};

const screenOptions = { gestureEnabled: false };

const Tab = createBottomTabNavigator( );
const Stack = createStackNavigator( );

const tabBar = props => <Footer {...props} />;

const notificationsConfig = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
};

const NotificationsFooter = ( ) => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="NotificationsFooter" component={Notifications} />
  </Tab.Navigator>
);

const NotificationsStack = ( ): Props => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="NotificationsStack"
      component={NotificationsFooter}
      options={notificationsConfig}
    />
  </Stack.Navigator>
);

export default NotificationsStack;
