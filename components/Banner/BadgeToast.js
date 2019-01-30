// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/banner/badgeToast";
import icons from "../../assets/icons";

type Props = {
  navigation: any
}

const BadgeToast = ( { navigation }: Props ) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate( "Badges" )}
  >
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
  </TouchableOpacity>
);

export default BadgeToast;
