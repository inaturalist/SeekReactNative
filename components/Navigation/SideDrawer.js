// @flow
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Footer from "../UIComponents/Footer";
import MainStack from "./MainStack";
import SideMenu from "../UIComponents/SideMenu";
import Achievements from "../Achievements/AchievementsScreen";
import Challenges from "../Challenges/ChallengeScreen";
import Observations from "../Observations/Observations";
import iNatStats from "../iNatStats";
import About from "../AboutScreen";
import Settings from "../Settings/Settings";
import ChallengeDetails from "../Challenges/ChallengeDetailsScreen";
import Match from "../Match/MatchScreen";

const Tab = createBottomTabNavigator();

const tabBar = props => <Footer {...props} />;

const AchievementsFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="Achievements" component={Achievements} />
  </Tab.Navigator>
);

const ChallengesFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="Challenges" component={Challenges} />
  </Tab.Navigator>
);

const ChallengeDetailsFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="ChallengeDetails" component={ChallengeDetails} />
  </Tab.Navigator>
);

const ObservationsFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="Observations" component={Observations} />
  </Tab.Navigator>
);

const iNatStatsFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="iNatStats" component={iNatStats} />
  </Tab.Navigator>
);

const AboutFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="About" component={About} />
  </Tab.Navigator>
);

const SettingsFooter = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();

const drawerContent = props => <SideMenu {...props} />;

const SideMenuDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Drawer"
    drawerContent={drawerContent}
  >
    <Drawer.Screen name="Main" component={MainStack} />
    <Drawer.Screen name="Achievements" component={AchievementsFooter} />
    <Drawer.Screen name="Challenges" component={ChallengesFooter} />
    <Drawer.Screen name="ChallengeDetails" component={ChallengeDetailsFooter} />
    <Drawer.Screen name="Observations" component={ObservationsFooter} />
    <Drawer.Screen name="iNatStats" component={iNatStatsFooter} />
    <Drawer.Screen name="About" component={AboutFooter} />
    <Drawer.Screen name="Settings" component={SettingsFooter} />
    {/* MatchScreen needs to be nested inside Drawer because it has
    a footer with navigation.openDrawer( ) that won't work otherwise */}
    <Drawer.Screen name="Match" component={Match} />
  </Drawer.Navigator>
);

export default SideMenuDrawer;
