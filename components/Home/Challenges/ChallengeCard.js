// @flow

import StyledText from "../../UIComponents/StyledText";

import React from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import GreenText from "../../UIComponents/GreenText";
import NoChallenges from "./NoChallenges";
import useLatestChallenge from "./hooks/challengeCardHooks";
import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/home/challenges";
import backgrounds from "../../../assets/backgrounds";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";
import ChallengeTitle from "../../UIComponents/Challenges/ChallengeTitle";
import ChallengeBadgeRow from "../../UIComponents/Challenges/ChallengeBadgeRow";
import { ChallengeContext } from "../../UserContext";

const ChallengeCard = ( ): Node => {
  const { setIndex } = React.useContext( ChallengeContext );
  const { navigate } = useNavigation( );
  const challenge = useLatestChallenge( );

  const navToChallenges = ( ) => navigate( "Challenges" );

  const renderLatestChallenge = ( ) => {
    const navToChallengeDetails = ( ) => {
      setIndex( challenge.index );
      navigate( "ChallengeDetails" );
    };

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
        <StyledText
          onPress={navToChallenges}
          style={textStyles.viewText}
        >
          {i18n.t( "challenges_card.view_all" )}
        </StyledText>
      </ImageBackground>
    );
  };

  return (
    <View style={viewStyles.container}>
      <TouchableOpacity onPress={navToChallenges} style={viewStyles.header}>
        <GreenText text="challenges_card.header" />
      </TouchableOpacity>
      {challenge ? renderLatestChallenge( ) : <NoChallenges />}
    </View>
  );
};

export default ChallengeCard;
