import { createDrawerNavigator } from "react-navigation-drawer";

import MainStack from "./MainStack";
import SideMenu from "../UIComponents/SideMenu";
import AchievementsScreen from "../Achievements/AchievementsScreen";
import ChallengeScreen from "../Challenges/ChallengeScreen";
import Observations from "../Observations/Observations";
import iNatStatsScreen from "../iNatStats";
import AboutScreen from "../AboutScreen";
import SettingsScreen from "../Settings";

const DrawerNavigatorConfig = {
  contentComponent: SideMenu,
  headerMode: "none"
};

const MenuDrawerNav = createDrawerNavigator( {
  Main: {
    screen: MainStack
  },
  Achievements: {
    screen: AchievementsScreen
  },
  Challenges: {
    screen: ChallengeScreen
  },
  MyObservations: {
    screen: Observations
  },
  iNatStats: {
    screen: iNatStatsScreen
  },
  About: {
    screen: AboutScreen
  },
  Settings: {
    screen: SettingsScreen
  }
}, DrawerNavigatorConfig );

export default MenuDrawerNav;
