// @flow

import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  View,
  Platform
} from "react-native";
import Realm from "realm";
import { useNavigation } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import realmConfig from "../../models";
import GreenHeader from "../UIComponents/GreenHeader";
import EmptyState from "../UIComponents/EmptyState";
import { updateNotifications } from "../../utility/notificationHelpers";
import Padding from "../UIComponents/Padding";
import BottomSpacer from "../UIComponents/BottomSpacer";

const NotificationsScreen = () => {
  const insets = useSafeArea();
  const navigation = useNavigation();

  const scrollView = useRef( null );
  const [notifications, setNotifications] = useState( [] );

  const useScrollToTop = () => {
    const scrollToTop = () => {
      if ( scrollView && scrollView.current !== null ) {
        scrollView.current.scrollToOffset( {
          x: 0, y: 0, animated: Platform.OS === "android"
        } );
      }
    };

    useEffect( () => {
      navigation.addListener( "focus", () => {
        scrollToTop();
      } );
    } );
  };

  useScrollToTop();

  const fetchNotifications = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const notificationList = realm.objects( "NotificationRealm" ).sorted( "index", true );
        setNotifications( notificationList );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  useEffect( () => { fetchNotifications(); }, [] );

  useEffect( () => {
    navigation.addListener( "blur", () => {
      updateNotifications();
    } );
  }, [navigation] );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenHeader header="notifications.header" />
      <FlatList
        ref={scrollView}
        contentContainerStyle={[styles.containerWhite, styles.flexGrow]}
        data={notifications}
        keyExtractor={( item, i ) => `${item}${i}`}
        ListFooterComponent={() => (
          <>
            <Padding />
            <BottomSpacer />
          </>
        )}
        renderItem={( { item } ) => <NotificationCard item={item} />}
        ListEmptyComponent={() => <EmptyState />}
      />
    </View>
  );
};

export default NotificationsScreen;
