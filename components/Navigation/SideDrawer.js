// @flow
import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import type { DrawerScreenProps } from "@react-navigation/drawer";

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
const Drawer = createDrawerNavigator( );
const drawerContent = props => <SideMenu {...props} />;

const config = { headerShown: false };
const screenOptions = { ...config, drawerType: "front" };

const SideMenuDrawer = ( ): Props => (
  <Drawer.Navigator
    initialRouteName="Drawer"
    drawerContent={drawerContent}
    screenOptions={screenOptions}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Achievements" component={Achievements} />
    <Drawer.Screen name="Challenges" component={Challenges} />
    <Drawer.Screen name="ChallengeDetails" component={ChallengeDetails} />
    <Drawer.Screen name="Observations" component={Observations} />
    <Drawer.Screen name="iNatStats" component={iNatStats} />
    <Drawer.Screen name="About" component={About} />
    <Drawer.Screen name="Settings" component={Settings} />
    {/* MatchScreen needs to be nested inside Drawer because it has
    a footer with navigation.openDrawer( ) that won't work otherwise */}
    <Drawer.Screen name="Match" component={Match} />
    <Drawer.Screen name="Species" component={Species} />
    <Drawer.Screen name="DebugEmailScreen" component={DebugEmailScreen} />
  </Drawer.Navigator>
);

export default SideMenuDrawer;
