import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../Home/HomeScreen";
import SpeciesDetail from "../Species/SpeciesDetail";
import Observations from "../Observations/Observations";
import AchievementsScreen from "../Achievements/AchievementsScreen";
import AboutScreen from "../AboutScreen";
import ChallengeScreen from "../Challenges/ChallengeScreen";
import ChallengeDetailsScreen from "../Challenges/ChallengeDetailsScreen";
import iNatStatsScreen from "../iNatStats";
import Footer from "../UIComponents/Footer";
import ChallengeFooter from "../Challenges/ChallengeFooter";
import DebugAndroid from "../UIComponents/DebugAndroid";
import SettingsScreen from "../Settings";

const FooterTabConfig = {
  tabBarComponent: Footer
};

const ChallengeFooterTabConfig = {
  tabBarComponent: ChallengeFooter
};

const ChallengeFooterTabNav = createBottomTabNavigator( {
  Challenges: {
    screen: ChallengeScreen
  },
  ChallengeDetails: {
    screen: ChallengeDetailsScreen
  }
}, ChallengeFooterTabConfig );

const FooterTabNav = createBottomTabNavigator( { // these are screens that need access to the footer
  Main: {
    screen: HomeScreen
  },
  iNatStats: {
    screen: iNatStatsScreen
  },
  Achievements: {
    screen: AchievementsScreen
  },
  MyObservations: {
    screen: Observations
  },
  About: {
    screen: AboutScreen
  },
  Species: {
    screen: SpeciesDetail
  },
  DebugAndroid: {
    screen: DebugAndroid
  },
  Settings: {
    screen: SettingsScreen
  }
}, FooterTabConfig );

export {
  FooterTabNav,
  ChallengeFooterTabNav
};
