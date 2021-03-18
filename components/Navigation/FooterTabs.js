// @flow
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SpeciesDetail from "../Species/SpeciesDetail";
import Footer from "../UIComponents/Footer";

const Tab = createBottomTabNavigator();

const tabBar = props => <Footer {...props} />;

const FooterTabNav = () => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name="Species" component={SpeciesDetail} />
  </Tab.Navigator>
);

export default FooterTabNav;
