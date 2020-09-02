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

import realmConfig from "../../models";
import styles from "../../styles/uiComponents/footer";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import backgrounds from "../../assets/backgrounds";
import { colors } from "../../styles/global";
import logos from "../../assets/logos";

const Footer = () => {
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

  return (
    <SafeAreaView edges={["right", "bottom", "left"]}>
      <ImageBackground source={backgrounds.navBar} style={styles.container}>
        <View style={[styles.navbar, styles.row]}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.menu" )}
            accessible
            onPress={() => navigation.openDrawer()}
            style={styles.leftIcon}
          >
            <Image source={icons.hamburger} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.camera" )}
            accessible
            onPress={() => navigation.navigate( "Camera" )}
            style={styles.camera}
          >
            <Image source={icons.cameraGreen} style={styles.cameraImage} />
          </TouchableOpacity>
          {challenge ? (
            <TouchableOpacity
              accessibilityLabel={i18n.t( "accessibility.iNatStats" )}
              accessible
              onPress={() => navigation.navigate( "iNatStats" )}
              style={styles.rightIcon}
            >
              {/* $FlowFixMe */}
              <Image source={logos.bird} tintColor={colors.seekForestGreen} style={styles.bird} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              accessibilityLabel={i18n.t( "accessibility.notifications" )}
              accessible
              onPress={() => navigation.navigate( "Notifications" )}
              style={styles.notificationPadding}
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
