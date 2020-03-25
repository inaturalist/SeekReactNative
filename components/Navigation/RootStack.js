import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import MenuDrawerNav from "./SideMenu";
import LoginStack from "./LoginStack";
import SplashScreen from "../SplashScreen";
import OnboardingScreen from "../Onboarding/OnboardingScreen";

const forFade = ( { current } ) => ( {
  cardStyle: { opacity: current.progress }
} );

const defaultNavigation = {
  cardStyleInterpolator: forFade
};

const StackNavigatorConfig = {
  headerMode: "none",
  defaultNavigationOptions: defaultNavigation
};

const RootStack = createStackNavigator( {
  Home: {
    screen: SplashScreen
  },
  Onboarding: {
    screen: OnboardingScreen
  },
  Login: {
    screen: LoginStack
  },
  Main: {
    screen: MenuDrawerNav
  }
}, StackNavigatorConfig );

const App = createAppContainer( RootStack );

export default App;
