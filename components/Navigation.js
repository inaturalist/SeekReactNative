import React from "react";
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";

import {
  colors,
  padding,
  fontSize,
  fonts
} from "../styles/global";

import SplashScreen from "./SplashScreen";
import HomeScreen from "../containers/HomeContainer";
import Camera from "./Camera/Camera";
import Gallery from "./Camera/GalleryScreen";
import LocationPickerScreen from "./Challenges/LocationPickerScreen";
import TaxonPickerScreen from "./Challenges/TaxonPickerScreen";
import ChallengeResults from "./Results/ChallengeResults";
import SpeciesDetail from "./Species/SpeciesDetail";
import YourCollection from "./YourCollection";
import BadgesScreen from "./BadgesScreen";
import AboutScreen from "./AboutScreen";
import AboutTitle from "./AboutTitle";
import BadgesTitle from "./BadgesTitle";
import MenuTray from "./Home/MenuTray";
import LoginScreen from "./Login/LoginScreen";
import AgeVerifyScreen from "./Login/AgeVerifyScreen";

const DrawerNavigatorConfig = {
  drawerWidth: 100
  // drawerBackgroundColor: colors.teal,
  // drawerType: "slide"
};

const MenuNav = createDrawerNavigator( {
  Menu: {
    screen: MenuTray
  }
  // YourCollection: {
  //   screen: YourCollection,
  //   navigationOptions: ( { navigation } ) => ( {
  //     headerRight: <AboutTitle navigation={navigation} />
  //   } )
  // },
  // About: {
  //   screen: AboutScreen,
  //   navigationOptions: () => ( {
  //     title: "About"
  //   } )
  // }
}, DrawerNavigatorConfig );

const CameraNav = createBottomTabNavigator( {
  CAMERA: { screen: Camera },
  PHOTOS: { screen: Gallery }
}, {
  initialRouteName: "CAMERA",
  tabBarOptions: {
    activeTintColor: colors.white,
    activeBackgroundColor: colors.darkGreen,
    inactiveTintColor: colors.lightGray,
    labelStyle: {
      color: colors.white,
      textAlign: "center",
      paddingTop: padding.small,
      paddingBottom: padding.large,
      fontFamily: fonts.semibold,
      fontSize: fontSize.text
    },
    indicatorStyle: {
      backgroundColor: colors.white
    },
    style: {
      backgroundColor: colors.black,
      height: 55
    }
  }
} );

const StackNavigatorConfig = {
  headerMode: "screen"
};

const RootStack = createStackNavigator( {
  Home: {
    screen: SplashScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Menu: {
    screen: MenuNav,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Age: {
    screen: AgeVerifyScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Main: {
    screen: HomeScreen,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Camera: {
    screen: CameraNav,
    navigationOptions: () => ( {
      header: null
    } )
  },
  Location: {
    screen: LocationPickerScreen,
    navigationOptions: () => ( {
      header: null,
      gesturesEnabled: false
    } )
  },
  Taxon: {
    screen: TaxonPickerScreen,
    navigationOptions: () => ( {
      header: null,
      gesturesEnabled: false
    } )
  },
  Results: {
    screen: ChallengeResults,
    navigationOptions: () => ( {
      headerStyle: {
        backgroundColor: colors.darkestBlue
      },
      headerTintColor: colors.white
    } )
  },
  Species: {
    screen: SpeciesDetail,
    navigationOptions: ( { navigation } ) => ( {
      title: navigation.state.params.seen ? "Collected" : "Collect This!",
      headerStyle: {
        backgroundColor: navigation.state.params.seen ? colors.lightGray : colors.darkestBlue
      },
      headerTintColor: navigation.state.params.seen ? colors.black : colors.white
    } )
  },
  YourCollection: {
    screen: YourCollection,
    navigationOptions: ( { navigation } ) => ( {
      headerRight: <AboutTitle navigation={navigation} />
    } )
  },
  Badges: {
    screen: BadgesScreen,
    navigationOptions: ( { navigation } ) => ( {
      headerTitle: <BadgesTitle navigation={navigation} />
    } )
  },
  About: {
    screen: AboutScreen,
    navigationOptions: () => ( {
      title: "About"
    } )
  }
}, StackNavigatorConfig );

export default RootStack;
