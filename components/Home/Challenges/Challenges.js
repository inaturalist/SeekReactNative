// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../../i18n";
import styles from "../../../styles/home/challenges";
import logos from "../../../assets/logos";
import backgrounds from "../../../assets/backgrounds";
import { setChallengeIndex } from "../../../utility/challengeHelpers";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";
import { setRoute } from "../../../utility/helpers";


type Props = {
  +navigation: any,
  +challenge: Object
}

const Challenges = ( { navigation, challenge }: Props ) => (
  <ImageBackground
    source={backgrounds[challenge.homeBackgroundName]}
    style={styles.challengeContainer}
  >
    <Text style={[styles.challengeHeader, styles.textContainer]}>
      {i18n.t( challenge.month ).toLocaleUpperCase()}
    </Text>
    <Text style={[styles.challengeName, styles.textContainer]}>
      {i18n.t( challenge.name ).toLocaleUpperCase()}
    </Text>
    <View style={styles.row}>
      <Image source={logos.op} style={styles.image} />
      <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
    </View>
    <View style={styles.textContainer}>
      <GreenButton
        color={colors.seekGreen}
        handlePress={() => {
          setChallengeIndex( challenge.index );
          setRoute( "Main" );
          navigation.navigate( "ChallengeDetails" );
        }}
        text={challenge.started
          ? "challenges_card.continue_challenge"
          : "challenges_card.take_challenge"}
      />
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate( "Challenges" )}
      style={styles.centeredContent}
    >
      <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
    </TouchableOpacity>
  </ImageBackground>
);

export default withNavigation( Challenges );
