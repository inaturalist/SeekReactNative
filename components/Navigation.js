import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { fadeIn, fromRight, fromBottom } from "react-navigation-transitions";

import styles from "../styles/navigation";
import i18n from "../i18n";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./Home/HomeScreen";
import ARCamera from "./Camera/ARCamera";
import Gallery from "./Camera/GalleryScreen";
import Results from "./Results/Results";
import SpeciesDetail from "./Species/SpeciesDetail";
import RangeMap from "./Species/RangeMap";
import MyObservations from "./Observations/MyObservations";
import AchievementsScreen from "./Achievements/AchievementsScreen";
import AboutScreen from "./Menu/AboutScreen";
import SideMenu from "./Home/SideMenu";
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Notifications/Notifications";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import ChallengeDetailsScreen from "./Challenges/ChallengeDetailsScreen";
import iNatStatsScreen from "./Menu/iNatStats";
import CameraHelpScreen from "./Camera/CameraHelpScreen";
// import Camera from "./Camera/Camera";
// import LoginScreen from "./Login/LoginScreen";
// import AgeVerifyScreen from "./Login/AgeVerifyScreen";
// import iNatLoginScreen from "./Login/iNatLoginScreen";
// import CheckEmailScreen from "./Login/CheckEmailScreen";
// import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
// import WelcomeScreen from "./Login/WelcomeScreen";
// import ParentalConsentScreen from "./Login/ParentalConsentScreen";
// import SignUpScreen from "./Login/SignUpScreen-1";
// import SignUpScreen2 from "./Login/SignUpScreen-2";
// import ParentCheckEmailScreen from "./Login/ParentCheckEmailScreen";
// import PrivacyPolicyScreen from "./Login/PrivacyPolicyScreen";

const handleCustomTransition = ( { scenes } ) => {
  const nextScene = scenes[scenes.length - 1];

  if ( nextScene.route.routeName === "Notifications" ) {
    return fromRight();
  } else if ( nextScene.route.routeName === "Camera" ) {
    return fromBottom( 100 );
  };
  return fadeIn();
};

const CameraNav = createMaterialTopTabNavigator( {
  CAMERA: {
    screen: ARCamera,
    navigationOptions: () => ( {
      title: i18n.t( "camera.label" ).toLocaleUpperCase()
    } )
  },
  PHOTOS: {
    screen: Gallery,
    navigationOptions: () => ( {
      title: i18n.t( "gallery.label" ).toLocaleUpperCase()
    } )
  }
}, {
  initialRouteName: "CAMERA",
  tabBarPosition: "bottom",
  tabBarOptions: {
    scrollEnabled: true,
    labelStyle: styles.cameraTabLabel,
    style: styles.cameraTab,
    indicatorStyle: styles.indicator
  }
} );

const StackNavigatorConfig = {
  headerMode: "none",
  transitionConfig: () => fadeIn()
};

const DrawerNavigatorConfig = {
  contentComponent: SideMenu,
  headerMode: "none"
};

const MainStack = createStackNavigator( {
  Main: {
    screen: HomeScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  // Challenges: {
  //   screen: ChallengeScreen,
  //   navigationOptions: () => ( {
  //     header: null
  //   } )
  // },
  // ChallengeDetails: {
  //   screen: ChallengeDetailsScreen,
  //   navigationOptions: () => ( {
  //     header: null
  //   } )
  // },
  Camera: {
    screen: CameraNav,
    navigationOptions: () => ( {
      header: null,
      mode: "modal"
    } )
  },
  CameraHelp: {
    screen: CameraHelpScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Results: {
    screen: Results,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Species: {
    screen: SpeciesDetail,
    navigationOptions: () => ( {
      header: null
    } )
  },
  RangeMap: {
    screen: RangeMap,
    navigationOptions: () => ( {
      header: null
    } )
  }
}, {
  transitionConfig: nav => handleCustomTransition( nav )
} );

const MenuDrawerNav = createDrawerNavigator( {
  Main: {
    screen: MainStack,
    navigationOptions: () => ( {
      header: null
    } )
  },
  iNatStats: {
    screen: iNatStatsScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Challenges: {
    screen: ChallengeScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  ChallengeDetails: {
    screen: ChallengeDetailsScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Badges: {
    screen: AchievementsScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  MyObservations: {
    screen: MyObservations,
    navigationOptions: () => ( {
      header: null
    } )
  },
  About: {
    screen: AboutScreen,
    navigationOptions: () => ( {
      header: null
    } )
  }
}, DrawerNavigatorConfig );

// const LoginStack = createStackNavigator( {
//   Login: {
//     screen: LoginScreen,
//     navigationOptions: () => ( {
//       header: null
//     } )
//   },
//   Age: {
//     screen: AgeVerifyScreen,
//     navigationOptions: () => ( {
//       headerTransparent: true,
//       headerBackImage: backButton
//     } )
//   },
//   iNatLogin: {
//     screen: iNatLoginScreen,
//     navigationOptions: () => ( {
//       headerTransparent: true,
//       headerBackImage: backButton
//     } )
//   },
//   Forgot: {
//     screen: ForgotPasswordScreen,
//     navigationOptions: () => ( {
//       headerTransparent: true,
//       headerBackImage: backButton
//     } )
//   },
//   CheckEmail: {
//     screen: CheckEmailScreen,
//     navigationOptions: () => ( {
//       header: null
//     } )
//   },
//   ParentCheckEmail: {
//     screen: ParentCheckEmailScreen,
//     navigationOptions: () => ( {
//       header: null
//     } )
//   },
//   Welcome: {
//     screen: WelcomeScreen,
//     navigationOptions: () => ( {
//       header: null
//     } )
//   },
//   Parent: {
//     screen: ParentalConsentScreen,
//     navigationOptions: () => ( {
//       headerTransparent: true,
//       headerBackImage: backButton
//     } )
//   },
//   Signup: {
//     screen: SignUpScreen,
//     navigationOptions: () => ( {
//       headerTransparent: true,
//       headerBackImage: backButton
//     } )
//   },
//   Signup2: {
//     screen: SignUpScreen2,
//     navigationOptions: () => ( {
//       headerTransparent: true,
//       headerBackImage: backButton
//     } )
//   },
//   Privacy: {
//     screen: PrivacyPolicyScreen,
//     navigationOptions: () => ( {
//       title: i18n.t( "privacy.header" ),
//       headerStyle: styles.greenHeader,
//       headerTitleStyle: styles.whiteHeaderTitle,
//       headerBackImage: backButton
//     } )
//   }
// } );

const RootStack = createStackNavigator( {
  Home: {
    screen: SplashScreen
  },
  Onboarding: {
    screen: OnboardingScreen
  },
  // Login: {
  //   screen: LoginStack
  // },
  Main: {
    screen: MenuDrawerNav
  }
}, StackNavigatorConfig );

const App = createAppContainer( RootStack );

export default App;
