// @flow

import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import type { Node } from "react";

import { viewStyles } from "../../styles/notifications";
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
  const renderItemSeparator = ( ) => <View style={viewStyles.divider} />;
  const renderFooter = ( ) => (
    <>
      <Padding />
      <BottomSpacer />
    </>
  );
  const extractKey = ( item, index ) => item + index;

  return (
    <ViewWithHeader testID="notifications-screen-container" header="notifications.header" footer={false}>
      <FlashList
        ref={scrollView}
        estimatedItemSize={106}
        contentContainerStyle={viewStyles.containerWhite}
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
