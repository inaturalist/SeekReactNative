// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import notifications from "../../assets/notifications";
import { setChallengeIndex } from "../../utility/challengeHelpers";
import { setRoute } from "../../utility/helpers";

type Props = {
  +navigation: any,
  +item: Object
}

const NotificationCard = ( { navigation, item }: Props ) => (
  <View>
    <TouchableOpacity
      onPress={() => {
        if ( item.nextScreen === "ChallengeDetails" ) {
          setRoute( "Notifications" );
          setChallengeIndex( item.challengeIndex );
        }
        navigation.navigate( item.nextScreen );
      }}
      style={[styles.card, styles.row]}
    >
      <Image source={notifications[item.iconName]} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {i18n.t( item.title )}
        </Text>
        <Text style={styles.messageText}>
          {i18n.t( item.message )}
        </Text>
      </View>
      {item.seen === false ? <View style={styles.greenDot} /> : null}
    </TouchableOpacity>
    <View style={styles.divider} />
  </View>
);

export default withNavigation( NotificationCard );
