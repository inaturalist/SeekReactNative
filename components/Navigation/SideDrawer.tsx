import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";

import About from "../About/AboutScreen";
import Achievements from "../Achievements/AchievementsScreen";
import ChallengeDetails from "../Challenges/ChallengeDetails/ChallengeDetailsScreen";
import Challenges from "../Challenges/ChallengeScreen/ChallengeScreen";
import Home from "../Home/HomeScreen";
import iNatStats from "../iNaturalist/iNatStats";
import Match from "../Match/MatchScreen";
import Notifications from "../Notifications/Notifications";
import Observations from "../Observations/Observations";
import SeekYearInReviewMapScreen from "../SeekYearInReview/SeekYearInReviewMapScreen";
import SeekYearInReview from "../SeekYearInReview/SeekYearInReviewScreen";
import Settings from "../Settings/Settings";
import Species from "../Species/SpeciesDetail";
import DebugEmailScreen from "../UIComponents/DebugEmailScreen";
import SideMenu from "../UIComponents/SideMenu";
import type { DrawerParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerParamList>( );
const drawerContent = props => <SideMenu {...props} />;

const screenOptions = {
  headerShown: false,
  drawerType: "front",
} as const;

const SideDrawer = ( ) => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={drawerContent}
    screenOptions={screenOptions}
    backBehavior="history"
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
    <Drawer.Screen name="SeekYearInReview" component={SeekYearInReview} />
    <Drawer.Screen name="SeekYearInReviewMapScreen" component={SeekYearInReviewMapScreen} />
    <Drawer.Screen name="Notifications" component={Notifications} />
  </Drawer.Navigator>
);

export default SideDrawer;
