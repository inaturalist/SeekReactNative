import React from "react";
import {
  View,
  Image,
  Text
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/banner/badgeToast";
import icons from "../../assets/icons";

const BadgeToast = () => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.headerText}>{"BADGE NAME".toUpperCase()}</Text>
      <Text style={styles.description}>
        {i18n.t( "banner.number_seen", {
          number: 10,
          taxaType: "Amphibians"
        } )}
      </Text>
      <Text style={styles.view}>{i18n.t( "banner.view" )}</Text>
    </View>
    <Image source={icons.badgePlaceholder} />
  </View>
);

export default BadgeToast;
