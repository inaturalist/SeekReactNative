// @flow
import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";

import realmConfig from "../../models";
import styles from "../../styles/home/footer";
import icons from "../../assets/icons";

type Props = {
  navigation: any
}

class Footer extends Component<Props> {
  constructor() {
    super();

    this.state = {
      notifications: false
    };
  }

  toggleNotifications( status ) {
    this.setState( {
      notifications: status
    } );
  }

  fetchNotifications() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const notifications = realm.objects( "NotificationRealm" ).filtered( "seen == false" ).length;
        if ( notifications > 0 ) {
          this.toggleNotifications( true );
        } else {
          this.toggleNotifications( false );
        }
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  render() {
    const { notifications } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.fetchNotifications()} />
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={icons.hamburger} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push( "Camera" )}>
            <Image source={icons.cameraGreen} style={styles.cameraImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if ( navigation.state.routeName !== "Notifications" ) {
                navigation.push( "Notifications" );
              }
            }}
          >
            {notifications
              ? <Image source={icons.notifications} />
              : <Image source={icons.notificationsInactive} />
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Footer;
