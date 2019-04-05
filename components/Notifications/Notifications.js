// @flow

import React, { Component } from "react";
import {
  FlatList,
  View,
  SafeAreaView,
  Text
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import realmConfig from "../../models";
import Footer from "../Home/Footer";
import GreenHeader from "../GreenHeader";
import { updateNotifications } from "../../utility/notificationHelpers";

type Props = {
  navigation: any
}

class NotificationsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      notifications: []
    };
  }

  fetchNotifications() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const notifications = realm.objects( "NotificationRealm" ).sorted( "index", true );
        this.setState( {
          notifications
        } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { notifications } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => this.fetchNotifications()}
            onWillBlur={() => updateNotifications()}
          />
          <GreenHeader navigation={navigation} header={i18n.t( "notifications.header" )} />
          <View style={{ marginTop: 15 }} />
          {notifications.length > 0
            ? (
              <FlatList
                data={notifications}
                style={styles.notificationsContainer}
                keyExtractor={( item, i ) => `${item}${i}`}
                renderItem={( { item } ) => (
                  <NotificationCard item={item} navigation={navigation} />
                )}
              />
            ) : (
              <View style={styles.noNotifications}>
                <Text style={styles.noNotificationsHeader}>
                  {i18n.t( "notifications.none" ).toLocaleUpperCase()}
                </Text>
                <Text style={styles.noNotificationsText}>
                  {i18n.t( "notifications.about" )}
                </Text>
              </View>
            )}
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default NotificationsScreen;
