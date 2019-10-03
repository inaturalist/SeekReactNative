// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/toasts/badgeToast";
import badges from "../../assets/badges";

type Props = {
  +navigation: any,
  +badge: Object
}

const BadgeToast = ( { navigation, badge }: Props ) => (
  <TouchableOpacity
    onPress={() => navigation.navigate( "Achievements" )}
  >
    <View style={styles.row}>
      <View>
        <Text style={styles.headerText}>
          {i18n.t( badge.intlName ).toLocaleUpperCase()}
        </Text>
        <Text style={styles.description}>
          {i18n.t( "badges.you_found" )}
          {" "}
          {i18n.t( badge.infoText )}
        </Text>
        <Text style={styles.view}>{i18n.t( "banner.view" )}</Text>
      </View>
      <Image source={badges[badge.earnedIconName]} style={styles.image} />
    </View>
  </TouchableOpacity>
);

export default BadgeToast;
