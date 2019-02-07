// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import BackIcon from "react-native-vector-icons/AntDesign";

import i18n from "../../i18n";
import styles from "../../styles/badges/badgeModal";
import { colors } from "../../styles/global";
import badgeImages from "../../assets/badges";

const backIcon = ( <BackIcon name="closecircle" size={50} color={colors.white} /> );

type Props = {
  badge: Object,
  toggleBadgeModal: Function
};

const BadgeModal = ( { badge, toggleBadgeModal }: Props ) => (
  <View style={styles.outerContainer}>
    <View style={styles.container}>
      <Text style={styles.headerText}>{i18n.t( "banner.level_up" ).toLocaleUpperCase()}</Text>
      <Image
        source={badgeImages[badge.earnedIconName]}
        style={styles.image}
      />
      <Text style={styles.nameText}>{badge.name.toLocaleUpperCase()}</Text>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => toggleBadgeModal()}>
      <Text>{backIcon}</Text>
    </TouchableOpacity>
  </View>
);

export default BadgeModal;
