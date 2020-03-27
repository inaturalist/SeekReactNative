import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Home/HomeScreen";
import SpeciesDetail from "../Species/SpeciesDetail";
import Footer from "../UIComponents/Footer";
import DebugAndroid from "../UIComponents/DebugAndroid";

const Tab = createBottomTabNavigator();

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultFade = {
  cardStyleInterpolator: forFade
};

const FooterTabNav = () => (
  <Tab.Navigator tabBar={props => <Footer {...props} />}>
    <Tab.Screen name="Main" component={HomeScreen} />
    <Tab.Screen name="DebugAndroid" component={DebugAndroid} />
    <Tab.Screen name="Species" component={SpeciesDetail} />
  </Tab.Navigator>
);

export default FooterTabNav;