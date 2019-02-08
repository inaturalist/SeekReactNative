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
import BannerHeader from "./BannerHeader";

const backIcon = ( <BackIcon name="closecircle" size={50} color={colors.white} /> );

type Props = {
  badge: Object,
  toggleBadgeModal: Function
};

const BadgeModal = ( { badge, toggleBadgeModal }: Props ) => (
  <View style={styles.outerContainer}>
    <View style={styles.container}>
      <BannerHeader text={badge.iconicTaxonName.toLocaleUpperCase()} />
      <Image
        source={badgeImages[badge.unearnedIconName]}
        style={styles.image}
      />
      <Text style={styles.headerText}>{i18n.t( "badges.to_earn" ).toLocaleUpperCase()}</Text>
      <Text style={styles.nameText}>Observe 1 bird</Text>
      <View style={styles.row}>
        <Image
          source={badgeImages[badge.unearnedIconName]}
          style={styles.smallImage}
        />
        <Image
          source={badgeImages[badge.unearnedIconName]}
          style={styles.smallImage}
        />
        <Image
          source={badgeImages[badge.unearnedIconName]}
          style={styles.smallImage}
        />
      </View>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => toggleBadgeModal()}>
      <Text>{backIcon}</Text>
    </TouchableOpacity>
  </View>
);

export default BadgeModal;
