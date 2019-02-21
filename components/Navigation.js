import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator } from "react-navigation";
import { fadeIn, fromLeft } from "react-navigation-transitions";
// import { Image } from "react-native";

// import { colors } from "../styles/global";
import styles from "../styles/navigation";
// import icons from "../assets/icons";
import i18n from "../i18n";

import SplashScreen from "./SplashScreen";
import HomeScreen from "./Home/HomeScreen";
import Camera from "./Camera/Camera";
import Gallery from "./Camera/GalleryScreen";
import Results from "./Results/Results";
import SpeciesDetail from "./Species/SpeciesDetail";
import MyObservations from "./Menu/MyObservations";
import BadgesScreen from "./Badges/BadgesScreen";
import AboutScreen from "./Menu/AboutScreen";
import SideMenu from "./Home/SideMenu";
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
import OnboardingScreen from "./Onboarding/OnboardingScreen";
import NotificationsScreen from "./Notifications/Notifications";
import ChallengeScreen from "./Challenges/ChallengeScreen";
import ChallengeDetailsScreen from "./Challenges/ChallengeDetailsScreen";
import iNatStatsScreen from "./Menu/iNatStats";
import CameraHelpScreen from "./Camera/CameraHelpScreen";

const handleCustomTransition = ( { scenes } ) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  // Custom transitions go there
  if ( prevScene
    && prevScene.route.routeName === "Home"
    && nextScene.route.routeName === "Main" ) {
    return fadeIn( 2000 );
  }
  return fromLeft();
};

// const backButton = (
//   <Image
//     source={icons.backButton}
//     style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 10 }}
//   />
// );

const CameraNav = createMaterialTopTabNavigator( {
  CAMERA: {
    screen: Camera,
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
  headerMode: "screen",
  transitionConfig: nav => handleCustomTransition( nav )
};

const DrawerNavigatorConfig = {
  contentComponent: SideMenu
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
  iNatStats: {
    screen: iNatStatsScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
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
  MyObservations: {
    screen: MyObservations,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Badges: {
    screen: BadgesScreen,
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
} );

const MenuDrawerNav = createDrawerNavigator( {
  Main: {
    screen: MainStack,
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
    screen: SplashScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  // Login: {
  //   screen: LoginStack,
  //   navigationOptions: () => ( {
  //     header: null
  //   } )
  // },
  Main: {
    screen: MenuDrawerNav,
    navigationOptions: () => ( {
      header: null
    } )
  }
}, StackNavigatorConfig );

export default RootStack;
