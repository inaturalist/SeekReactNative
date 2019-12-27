// @flow

import React, { Component } from "react";
import {
  FlatList,
  View,
  Platform
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import realmConfig from "../../models";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import EmptyState from "../UIComponents/EmptyState";
import { updateNotifications } from "../../utility/notificationHelpers";

type Props = {
  +navigation: any
}

type State = {
  notifications: Array<Object>
}

class NotificationsScreen extends Component<Props, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      notifications: []
    };
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollToOffset( {
        y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  fetchNotifications() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const notifications = realm.objects( "NotificationRealm" ).sorted( "index", true );
        this.setState( { notifications } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { notifications } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <NavigationEvents
          onDidBlur={() => updateNotifications()}
          onDidFocus={() => this.scrollToTop()}
          onWillFocus={() => this.fetchNotifications()}
        />
        <GreenHeader header={i18n.t( "notifications.header" )} navigation={navigation} />
        {notifications.length > 0 ? (
          <FlatList
            ref={( ref ) => { this.scrollView = ref; }}
            data={notifications}
            keyExtractor={( item, i ) => `${item}${i}`}
            renderItem={( { item } ) => (
              <NotificationCard item={item} navigation={navigation} />
            )}
          />
        ) : <EmptyState />}
      </View>
    );
  }
}

export default NotificationsScreen;
