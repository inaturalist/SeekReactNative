// @flow

import React from "react";
import { View, Text, Image } from "react-native";
import { isAfter } from "date-fns";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/challenges";
import badges from "../../../assets/badges";
import { colors } from "../../../styles/global";

type Props = {
  challenge: Object,
  large?: boolean
}

const ChallengeBadgeRow = ( { challenge, large }: Props ) => {
  const is2020OrAfterChallenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  // we created generic seek challenge text after the Our Planet challenges
  const text = is2020OrAfterChallenge ? i18n.t( "challenges_card.new_join" ) : i18n.t( "challenges_card.join" );
  const longText = text.length > 70;

  const showBadge = ( ) => {
    if ( challenge.percentComplete === 100 ) {
      return <Image source={badges[challenge.earnedIconName]} style={styles.badge} />;
    } else {
      return (
        // $FlowFixMe
        <Image
          source={badges.badge_empty}
          tintColor={colors.white}
          style={[large ? styles.badge : styles.badgeSmall, styles.white]}
        />
      );
    }
  };

  return (
    <View style={[styles.row, styles.center]}>
      {challenge && showBadge( )}
      <View style={styles.marginMiddle} />
      <Text style={[large ? styles.text : styles.textSmall, longText && styles.longText]}>
        {text}
      </Text>
    </View>
  );
};

ChallengeBadgeRow.defaultProps = {
  large: false
};

export default ChallengeBadgeRow;
