// @flow

import React, { Component } from "react";
import {
  FlatList,
  View
} from "react-native";
import Realm from "realm";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import realmConfig from "../../models";
import Footer from "../Home/Footer";
import GreenHeader from "../GreenHeader";

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
        this.setState( { notifications } );
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
        <GreenHeader navigation={navigation} header={i18n.t( "notifications.header" )} />
        <FlatList
          data={notifications}
          style={styles.notificationsContainer}
          keyExtractor={( item, i ) => `${item}${i}`}
          renderItem={( { item } ) => (
            <NotificationCard item={item} navigation={navigation} />
          )}
        />
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default NotificationsScreen;
