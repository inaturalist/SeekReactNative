// @flow

import React, { Component } from "react";
import {
  FlatList,
  View
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import realmConfig from "../../models";
import Footer from "../Home/Footer";
import Padding from "../Padding";

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
        const notifications = realm.objects( "NotificationRealm" );
        console.log( notifications, "notifications in screen" );
        this.setState( {
          notifications
        } );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { notifications } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.fetchNotifications()}
        />
        <View style={styles.notificationsContainer}>
          <FlatList
            data={notifications}
            keyExtractor={( item, i ) => `${item}${i}`}
            renderItem={( { item } ) => (
              <NotificationCard item={item} navigation={navigation} />
            )}
          />
          <Padding />
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default NotificationsScreen;
