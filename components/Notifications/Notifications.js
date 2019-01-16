// @flow

import React, { Component } from "react";
import {
  Text,
  FlatList,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import NotificationCard from "./NotificationCard";
import Footer from "../Home/Footer";
import { capitalizeNames } from "../../utility/helpers";
import logos from "../../assets/logos";

type Props = {
  navigation: any
}

class NotificationsScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      notifications: [
        {
          title: "Your observation was identified to species on iNaturalist!",
          message: "Thanks for helping improve our model! Your badges may have been updated.",
          iconName: logos.bird
        },
        {
          title: "You've earned a lot of badges! You might like iNaturalist!",
          message: "Learn more about iNaturalist",
          iconName: logos.bird
        },
        {
          title: "You're almost finished with your challenge!",
          message: "View your progress",
          iconName: logos.bird
        }
      ]
    };
  }

  render() {
    const { notifications } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {capitalizeNames( i18n.t( "notifications.header" ) )}
          </Text>
        </View>
        <View style={styles.notificationsContainer}>
          <FlatList
            data={notifications}
            keyExtractor={( item, i ) => `${item}${i}`}
            renderItem={( { item } ) => (
              <NotificationCard item={item} navigation={navigation} />
            )}
          />
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default NotificationsScreen;
