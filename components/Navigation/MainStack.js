import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import CameraNav from "./CameraTab";
import FooterTabNav from "./FooterTabs";

import OfflineARResults from "../Results/OfflineARResults";
import OnlineServerResults from "../Results/OnlineServerResults";
import Match from "../Results/MatchScreen";
import RangeMap from "../Species/RangeMap";
import Notifications from "../Notifications/Notifications";
import CameraHelp from "../Camera/CameraHelpScreen";
import Post from "../PostToiNat/PostScreen";
import PostingHelp from "../PostToiNat/PostingHelpScreen";
import Wikipedia from "../Species/WikipediaView";

const Stack = createStackNavigator();

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultFade = {
  cardStyleInterpolator: forFade
};

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Footer"
    screenOptions={{ gestureEnabled: false }}
  >
    <Stack.Screen
      name="Footer"
      component={FooterTabNav}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    />
    <Stack.Screen
      name="CameraHelp"
      component={CameraHelp}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Camera"
      component={CameraNav}
      options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
    />
    <Stack.Screen
      name="OfflineARResults"
      component={OfflineARResults}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="OnlineServerResults"
      component={OnlineServerResults}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Match"
      component={Match}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen // turn range map into modal, since it only pops up from species screen
      name="RangeMap"
      component={RangeMap}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Post"
      component={Post}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="PostingHelp"
      component={PostingHelp}
      options={{ headerShown: false, defaultFade }}
    />
    <Stack.Screen
      name="Wikipedia"
      component={Wikipedia}
      options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
    />
  </Stack.Navigator>
);

export default MainStack;
