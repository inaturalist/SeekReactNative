// @flow

import React from "react";
import {
  View,
  Text,
  ImageBackground
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../../i18n";
import styles from "../../../styles/home/challenges";
import backgrounds from "../../../assets/backgrounds";
import { setChallengeIndex } from "../../../utility/challengeHelpers";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";
import { setRoute } from "../../../utility/helpers";
import ChallengeTitle from "../../UIComponents/Challenges/ChallengeTitle";
import ChallengeBadgeRow from "../../UIComponents/Challenges/ChallengeBadgeRow";


type Props = {
  +navigation: any,
  +challenge: Object
}

const Challenges = ( { navigation, challenge }: Props ) => (
  <ImageBackground
    source={backgrounds[challenge.backgroundName]}
    style={styles.challengeContainer}
  >
    <View style={styles.marginTop} />
    <ChallengeTitle challenge={challenge} />
    <View style={styles.marginSmall} />
    <ChallengeBadgeRow challenge={challenge} />
    <View style={styles.marginSmall} />
    <GreenButton
      color={colors.seekGreen}
      handlePress={() => {
        setChallengeIndex( challenge.index );
        setRoute( "Main" );
        navigation.navigate( "ChallengeDetails" );
      }}
      text={challenge.startedDate
        ? "challenges_card.continue_challenge"
        : "challenges_card.take_challenge"}
    />
    <Text
      onPress={() => navigation.navigate( "Challenges" )}
      style={styles.viewText}
    >
      {i18n.t( "challenges_card.view_all" )}
    </Text>
  </ImageBackground>
);

export default withNavigation( Challenges );
