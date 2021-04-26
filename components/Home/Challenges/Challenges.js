// @flow

import * as React from "react";
import {
  View,
  Text,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/home/challenges";
import backgrounds from "../../../assets/backgrounds";
import { setChallengeIndex } from "../../../utility/challengeHelpers";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";
import ChallengeTitle from "../../UIComponents/Challenges/ChallengeTitle";
import ChallengeBadgeRow from "../../UIComponents/Challenges/ChallengeBadgeRow";

type Props = {
  challenge: {
    index: number,
    percentComplete: number,
    startedDate: Date,
    availableDate: Date,
    backgroundName: string,
    name: string,
    logo: string,
    sponsorName: string,
    secondLogo: string,
    earnedIconName: string,
    badgeName: string
  }
}

const Challenges = ( { challenge }: Props ): React.Node => {
  const navigation = useNavigation();

  const navToChallengeDetails = () => {
    setChallengeIndex( challenge.index );
    navigation.navigate( "ChallengeDetails" );
  };

  const navToAllChallenges = () => navigation.navigate( "Challenges" );

  const buttonText = challenge.startedDate
    ? "challenges_card.continue_challenge"
    : "challenges_card.take_challenge";

  return (
    <ImageBackground
      source={backgrounds[challenge.backgroundName]}
      style={viewStyles.challengeContainer}
    >
      <View style={viewStyles.marginTop} />
      <ChallengeTitle challenge={challenge} />
      <View style={viewStyles.marginSmall} />
      <ChallengeBadgeRow challenge={challenge} />
      <View style={viewStyles.marginMedium} />
      <GreenButton
        color={colors.seekGreen}
        handlePress={navToChallengeDetails}
        text={buttonText}
      />
      <Text
        onPress={navToAllChallenges}
        style={textStyles.viewText}
      >
        {i18n.t( "challenges_card.view_all" )}
      </Text>
    </ImageBackground>
  );
};

export default Challenges;
