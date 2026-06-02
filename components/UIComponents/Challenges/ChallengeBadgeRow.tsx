import { isAfter } from "date-fns";
import React from "react";
import { Image, View } from "react-native";

import badges from "../../../assets/badges";
import i18n from "../../../i18n";
import { baseTextStyles } from "../../../styles/textStyles";
import { imageStyles, textStyles, viewStyles } from "../../../styles/uiComponents/challenges";
import StyledText from "../../UIComponents/StyledText";

interface Props{
  challenge: {
    percentComplete: number;
    earnedIconName: string;
    availableDate: Date;
  };
  large?: boolean;
}

const ChallengeBadgeRow = ( { challenge, large = false }: Props ) => {
  const is2020OrAfterChallenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  // we created generic seek challenge text after the Our Planet challenges
  const text = is2020OrAfterChallenge ? i18n.t( "challenges_card.new_join" ) : i18n.t( "challenges_card.join" );
  const longText = text.length > 70;

  const showBadge = ( ) => {
    if ( challenge.percentComplete === 100 ) {
      return <Image source={badges[challenge.earnedIconName]} style={imageStyles.badge} />;
    } else {
      return (
        <Image
          source={badges.badge_empty}
          style={[large ? imageStyles.badge : imageStyles.badgeSmall, imageStyles.white]}
        />
      );
    }
  };

  return (
    <View style={[viewStyles.row, viewStyles.center]}>
      {challenge && showBadge( )}
      <View style={viewStyles.marginMiddle} />
      <StyledText
        style={[
          textStyles.badgeText,
          large
            ? [baseTextStyles.challengeDescription, textStyles.text]
            : baseTextStyles.bodyWhite,
          longText && textStyles.longText,
        ]}
      >
        {text}
      </StyledText>
    </View>
  );
};

export default ChallengeBadgeRow;
