// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import Realm from "realm";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import realmConfig from "../../models";
import { viewStyles, imageStyles } from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import backgrounds from "../../assets/backgrounds";
import { colors } from "../../styles/global";
import logos from "../../assets/logos";

const Footer = (): Node => {
  let challenge;
  const navigation = useNavigation();
  const route = useRoute();
  const [notifications, setNotifications] = useState( false );

  if ( route.name === "Challenges" || route.name === "ChallengeDetails" ) {
    challenge = true;
  }

  useEffect( () => {
    const fetchNotifications = () => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const newNotifications = realm.objects( "NotificationRealm" ).filtered( "viewed == false" ).length;
        if ( newNotifications > 0 ) {
          setNotifications( true );
        } else {
          setNotifications( false );
        }
      } ).catch( () => {
        console.log( "[DEBUG] Failed to fetch notifications: " );
      } );
    };

    navigation.addListener( "focus", () => {
      fetchNotifications();
    } );
  }, [navigation] );

  const navToDrawer = ( ) => {
    // notifications is different because it needs to be in a stack nav
    // to enable animation in from the right
    if ( route.name === "Notifications" ) {
      navigation.navigate( "Drawer" );
    } else {
      navigation.openDrawer( );
    }
  };

  return (
    <SafeAreaView style={viewStyles.safeArea} edges={["right", "bottom", "left"]}>
      <ImageBackground source={backgrounds.navBar} style={viewStyles.container}>
        <View style={[viewStyles.navbar, viewStyles.row, viewStyles.shadow]}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.menu" )}
            accessible
            onPress={navToDrawer}
            style={viewStyles.leftIcon}
          >
            <Image source={icons.hamburger} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.camera" )}
            accessible
            onPress={() => navigation.navigate( "Camera" )}
            style={viewStyles.camera}
          >
            <Image source={icons.cameraGreen} style={viewStyles.cameraImage} />
          </TouchableOpacity>
          {challenge ? (
            <TouchableOpacity
              accessibilityLabel={i18n.t( "accessibility.iNatStats" )}
              accessible
              onPress={() => navigation.navigate( "iNatStats" )}
              style={viewStyles.rightIcon}
            >
              {/* $FlowFixMe */}
              <Image source={logos.bird} tintColor={colors.seekForestGreen} style={imageStyles.bird} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              accessibilityLabel={i18n.t( "accessibility.notifications" )}
              accessible
              onPress={() => navigation.navigate( "Notifications" )}
              style={viewStyles.notificationPadding}
            >
              <Image source={notifications ? icons.notifications : icons.notificationsInactive} />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Footer;
