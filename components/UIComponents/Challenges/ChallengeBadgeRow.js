// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";
import { isAfter } from "date-fns";

import i18n from "../../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../../styles/uiComponents/challenges";
import badges from "../../../assets/badges";
import { colors } from "../../../styles/global";

type Props = {
  challenge: Object,
  large?: boolean
}

const ChallengeBadgeRow = ( { challenge, large }: Props ): React.Node => {
  const is2020OrAfterChallenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  // we created generic seek challenge text after the Our Planet challenges
  const text = is2020OrAfterChallenge ? i18n.t( "challenges_card.new_join" ) : i18n.t( "challenges_card.join" );
  const longText = text.length > 70;

  const showBadge = ( ) => {
    if ( challenge.percentComplete === 100 ) {
      return <Image source={badges[challenge.earnedIconName]} style={imageStyles.badge} />;
    } else {
      return (
        // $FlowFixMe
        <Image
          source={badges.badge_empty}
          tintColor={colors.white}
          style={[large ? imageStyles.badge : imageStyles.badgeSmall, imageStyles.white]}
        />
      );
    }
  };

  return (
    <View style={[viewStyles.row, viewStyles.center]}>
      {challenge && showBadge( )}
      <View style={viewStyles.marginMiddle} />
      <Text style={[large ? textStyles.text : textStyles.textSmall, longText && textStyles.longText]}>
        {text}
      </Text>
    </View>
  );
};

ChallengeBadgeRow.defaultProps = {
  large: false
};

export default ChallengeBadgeRow;
