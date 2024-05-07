// @flow

import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { imageStyles, viewStyles, textStyles } from "../../../styles/challenges/challengeProgress";
import PercentCircle from "../../UIComponents/PercentCircle";
import { startChallenge } from "../../../utility/challengeHelpers";
import icons from "../../../assets/icons";
import { formatMonthYear } from "../../../utility/dateHelpers";
import badges from "../../../assets/badges";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import { useChallenge } from "../../Providers/ChallengeProvider";

type Props = {
  +challenge: {
    name: string,
    availableDate: Date,
    percentComplete: number,
    startedDate: Date,
    index: number,
    earnedIconName: string,
    sponsorName: string
  },
  +fetchChallenges: ( ) => void
}

const ChallengeProgressCard = ( { challenge, fetchChallenges }: Props ): React.Node => {
  const { setIndex } = useChallenge( );
  const navigation = useNavigation( );
  const {
    name,
    availableDate,
    percentComplete,
    startedDate,
    index,
    earnedIconName
  } = challenge;
  let rightIcon;

  let leftIcon;

  if ( startedDate && percentComplete === 100 ) {
    leftIcon = badges[earnedIconName];
  } else {
    leftIcon = badges.badge_empty;
  }

  const navToChallengeDetails = ( ) => {
    setIndex( index );
    navigation.navigate( "ChallengeDetails" );
  };

  const beginChallenge = ( ) => {
    startChallenge( index );
    navToChallengeDetails( );
  };

  if ( percentComplete === 100 ) {
    rightIcon = <Image source={icons.completed} />;
  } else if ( startedDate && percentComplete !== 100 ) {
    rightIcon = <PercentCircle challenge={challenge} />;
  } else if ( fetchChallenges ) {
    rightIcon = (
      <StyledText
        accessibilityLabel={`${i18n.t( "challenges.start_now" )}${name}`}
        accessible
        allowFontScaling={false}
        onPress={beginChallenge}
        style={[baseTextStyles.challengeItemButton, textStyles.startText]}
      >
        {i18n.t( "challenges.start_now" ).toLocaleUpperCase( )}
      </StyledText>
    );
  }

  return (
    <TouchableOpacity
      onPress={navToChallengeDetails}
      style={[viewStyles.card, viewStyles.row]}
    >
      <Image source={leftIcon} style={imageStyles.challengeBadgeIcon} />
      <View style={viewStyles.textContainer}>
        <StyledText style={[baseTextStyles.challengeItemTitle, textStyles.titleText]}>
          {i18n.t( name ).toLocaleUpperCase( ).replace( /(- |-)/g, "-\n" )}
        </StyledText>
        <StyledText style={[baseTextStyles.regular, textStyles.messageText]}>
          {challenge.sponsorName}
          {" - "}
          {formatMonthYear( availableDate )}
        </StyledText>
      </View>
      <View style={viewStyles.startButton}>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

ChallengeProgressCard.defaultProps = {
  fetchChallenges: ( ) => {}
};

export default ChallengeProgressCard;
