// @flow

import React, { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import EmptyState from "../UIComponents/EmptyState";
import Padding from "../UIComponents/Padding";
import BottomSpacer from "../UIComponents/BottomSpacer";
import { markNotificationsAsViewed } from "../../utility/notificationHelpers";
import ViewWithHeader from "../UIComponents/Screens/ViewWithHeader";
import useFetchNotifications from "./hooks/notificationHooks";

const NotificationsScreen = ( ): Node => {
  const navigation = useNavigation( );
  const scrollView = useRef( null );
  const notifications = useFetchNotifications( );

  useScrollToTop( scrollView );

  useEffect( ( ) => {
    navigation.addListener( "focus", ( ) => {
      markNotificationsAsViewed( );
    } );
  }, [navigation] );

  const renderItem = ( { item } ) => <NotificationCard item={item} />;
  const showEmptyList = ( ) => <EmptyState />;
  const renderItemSeparator = ( ) => <View style={styles.divider} />;
  const renderFooter = ( ) => (
    <>
      <Padding />
      <BottomSpacer />
    </>
  );
  const extractKey = ( item, index ) => item + index;

  return (
    <ViewWithHeader header="notifications.header">
      <FlatList
        ref={scrollView}
        contentContainerStyle={[styles.containerWhite, styles.flexGrow]}
        data={notifications}
        keyExtractor={extractKey}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        ListEmptyComponent={showEmptyList}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </ViewWithHeader>
  );
};

export default NotificationsScreen;
