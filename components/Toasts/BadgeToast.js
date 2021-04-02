// @flow

import * as React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/toasts/badgeToast";
import badges from "../../assets/badges";

type Props = {
  +badge: Object
}

const BadgeToast = ( { badge }: Props ): React.Node => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate( "Achievements" )}
      style={styles.row}
    >
      <View>
        <Text allowFontScaling={false} style={styles.headerText}>
          {i18n.t( badge.intlName ).toLocaleUpperCase()}
        </Text>
        <Text allowFontScaling={false} style={styles.description}>
          {i18n.t( "badges.you_found" )}
          {" "}
          {i18n.t( badge.infoText )}
        </Text>
        <Text allowFontScaling={false} style={styles.view}>{i18n.t( "banner.view" )}</Text>
      </View>
      <Image source={badges[badge.earnedIconName]} style={styles.image} />
    </TouchableOpacity>
  );
};

export default BadgeToast;
