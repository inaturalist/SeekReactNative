// @flow

import React, { Component } from "react";
import {
  Text,
  Image,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/notifications";
import Footer from "./Footer";
import { capitalizeNames } from "../../utility/helpers";
import logos from "../../assets/logos";

type Props = {
  navigation: any
}

class NotificationsScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      notifications: []
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {capitalizeNames( i18n.t( "notifications.header" ) )}
          </Text>
        </View>
        <View style={styles.notificationsContainer}>
          <View style={styles.row}>
            <Image source={logos.bird} />
            <Text style={styles.text}>
              {i18n.t( "notifications.learn_more" )}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Image source={logos.bird} />
            <Text style={styles.text}>
              {i18n.t( "notifications.learn_more" )}
            </Text>
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default NotificationsScreen;
