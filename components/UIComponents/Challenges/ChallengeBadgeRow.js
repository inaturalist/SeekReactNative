// @flow

import React from "react";
import { View, Text, Image } from "react-native";
import { isAfter } from "date-fns";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/challenges";
import logos from "../../../assets/logos";
import badges from "../../../assets/badges";

type Props = {
  challenge: Object
}

const ChallengeBadgeRow = ( { challenge }: Props ) => {
  const is2020Challenge = isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  return (
    <View style={[styles.row, styles.center]}>
      {is2020Challenge
        ? <Image source={badges["badge-empty-white"]} style={styles.badgeSmall} />
        : <Image source={logos.op} style={styles.image} />}
      <Text style={styles.textSmall}>
        {is2020Challenge
          ? i18n.t( "challenges_card.new_join" )
          : i18n.t( "challenges_card.join" )}
      </Text>
    </View>
  );
};

export default ChallengeBadgeRow;
