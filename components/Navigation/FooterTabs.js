import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Home/HomeScreen";
import SpeciesDetail from "../Species/SpeciesDetail";
import Observations from "../Observations/Observations";
import Achievements from "../Achievements/AchievementsScreen";
import About from "../AboutScreen";
import Challenges from "../Challenges/ChallengeScreen";
import ChallengeDetails from "../Challenges/ChallengeDetailsScreen";
import iNatStats from "../iNatStats";
import Footer from "../UIComponents/Footer";
import ChallengeFooter from "../Challenges/ChallengeFooter";
import DebugAndroid from "../UIComponents/DebugAndroid";
import Settings from "../Settings";

const Tab = createBottomTabNavigator();

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultFade = {
  cardStyleInterpolator: forFade
};

const ChallengeFooterTabNav = () => (
  <Tab.Navigator tabBar={props => <ChallengeFooter {...props} />}>
    <Tab.Screen name="Challenges" component={Challenges} />
    <Tab.Screen name="ChallengeDetails" component={ChallengeDetails} />
  </Tab.Navigator>
);

const FooterTabNav = () => (
  <Tab.Navigator tabBar={props => <Footer {...props} />}>
    <Tab.Screen name="Main" component={HomeScreen} />
    {/* <Tab.Screen name="Achievements" component={Achievements} />
    <Tab.Screen name="MyObservations" component={Observations} />
    <Tab.Screen name="iNatStats" component={iNatStats} />
    <Tab.Screen name="About" component={About} />
    <Tab.Screen name="Settings" component={Settings} /> */}
    <Tab.Screen name="DebugAndroid" component={DebugAndroid} />
    <Tab.Screen name="Species" component={SpeciesDetail} />
  </Tab.Navigator>
);

export {
  FooterTabNav,
  ChallengeFooterTabNav
};
