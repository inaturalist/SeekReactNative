// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/challenges";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import { setChallengeIndex } from "../../utility/challengeHelpers";

type Props = {
  +navigation: any,
  +challenge: Object
}

const Challenges = ( { navigation, challenge }: Props ) => (
  <View>
    <TouchableOpacity
      onPress={() => navigation.navigate( "Challenges" )}
      style={styles.header}
    >
      <Text style={styles.headerText}>
        {i18n.t( "challenges_card.header" ).toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => {
          setChallengeIndex( challenge.index );
          navigation.navigate( "ChallengeDetails" );
        }}
        style={[styles.greenButton, styles.centeredContent, styles.textContainer]}
      >
        {challenge.started
          ? <Text style={styles.buttonText}>{i18n.t( "challenges_card.continue_challenge" ).toLocaleUpperCase()}</Text>
          : <Text style={styles.buttonText}>{i18n.t( "challenges_card.take_challenge" ).toLocaleUpperCase()}</Text>}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Challenges" )}
        style={styles.centeredContent}
      >
        <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

export default Challenges;
