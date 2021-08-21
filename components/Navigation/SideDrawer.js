// @flow
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";

import Footer from "../UIComponents/Footer";
import SideMenu from "../UIComponents/SideMenu";
import Achievements from "../Achievements/AchievementsScreen";
import Challenges from "../Challenges/ChallengeScreen/ChallengeScreen";
import Observations from "../Observations/Observations";
import iNatStats from "../iNaturalist/iNatStats";
import About from "../AboutScreen";
import Settings from "../Settings/Settings";
import ChallengeDetails from "../Challenges/ChallengeDetails/ChallengeDetailsScreen";
import Match from "../Match/MatchScreen";
import DebugEmailScreen from "../UIComponents/DebugEmailScreen";
import Home from "../Home/HomeScreen";
import Species from "../Species/SpeciesDetail";
type DrawerParamList = {
  Home: void;
  Achievements: void;
  Challenges: void;
  ChallengeDetails: void;
  Observations: void;
  iNatStats: void;
  About: void;
  Settings: void;
  Match: void;
  Species: void;
  DebugEmailScreen: void;
};

type Props = DrawerScreenProps<DrawerParamList>;

const Tab = createBottomTabNavigator();

const tabBar = props => <Footer {...props} />;

const AchievementsFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Achievements" component={Achievements} />
  </Tab.Navigator>
);

const ChallengesFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Challenges" component={Challenges} />
  </Tab.Navigator>
);

const ChallengeDetailsFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="ChallengeDetails" component={ChallengeDetails} />
  </Tab.Navigator>
);

const ObservationsFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Observations" component={Observations} />
  </Tab.Navigator>
);

const iNatStatsFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="iNatStats" component={iNatStats} />
  </Tab.Navigator>
);

const AboutFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="About" component={About} />
  </Tab.Navigator>
);

const SettingsFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const DebugEmailScreenFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="DebugEmailScreen" component={DebugEmailScreen} />
  </Tab.Navigator>
);

const HomeFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={Home} />
  </Tab.Navigator>
);

const SpeciesFooter = () => (
  <Tab.Navigator tabBar={tabBar} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Species" component={Species} />
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();

const drawerContent = props => <SideMenu {...props} />;

const SideMenuDrawer = ( ): Props => (
  <Drawer.Navigator
    initialRouteName="Drawer"
    drawerContent={drawerContent}
  >
    <Drawer.Screen name="Home" component={HomeFooter} />
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
    <Drawer.Screen name="Species" component={SpeciesFooter} />
    <Drawer.Screen name="DebugEmailScreen" component={DebugEmailScreenFooter} />
  </Drawer.Navigator>
);

export default SideMenuDrawer;
