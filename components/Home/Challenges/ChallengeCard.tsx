import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";

import backgrounds from "../../../assets/backgrounds";
import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import { textStyles, viewStyles } from "../../../styles/home/challenges";
import { baseTextStyles } from "../../../styles/textStyles";
import { useChallenge } from "../../Providers/ChallengeProvider";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ChallengeBadgeRow from "../../UIComponents/Challenges/ChallengeBadgeRow";
import ChallengeTitle from "../../UIComponents/Challenges/ChallengeTitle";
import GreenText from "../../UIComponents/GreenText";
import StyledText from "../../UIComponents/StyledText";
import useLatestChallenge from "./hooks/challengeCardHooks";
import NoChallenges from "./NoChallenges";

const ChallengeCard = ( ) => {
  const { setIndex } = useChallenge( );
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
          style={[baseTextStyles.bodyWhite, textStyles.viewText]}
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
