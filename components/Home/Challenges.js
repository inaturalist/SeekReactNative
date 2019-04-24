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
  navigation: any,
  challenge: Object
}

const Challenges = ( { navigation, challenge }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Challenges" )}
        >
          <Text style={styles.headerText}>
            {i18n.t( "challenges_card.header" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={backgrounds[challenge.homeBackgroundName]}
        style={styles.challengeContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.challengeHeader}>
            {i18n.t( challenge.month ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.challengeName}>
            {i18n.t( challenge.name ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={styles.row}>
          <Image source={logos.op} />
          <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
        </View>
        <View style={styles.centeredContent}>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => {
              setChallengeIndex( challenge.index );
              navigation.navigate( "ChallengeDetails" );
            }}
          >
            {challenge.started
              ? <Text style={styles.buttonText}>{i18n.t( "challenges_card.continue_challenge" ).toLocaleUpperCase()}</Text>
              : <Text style={styles.buttonText}>{i18n.t( "challenges_card.take_challenge" ).toLocaleUpperCase()}</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate( "Challenges" )}
          >
            <Text style={styles.viewText}>{i18n.t( "challenges_card.view_all" )}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  </View>
);

export default Challenges;
