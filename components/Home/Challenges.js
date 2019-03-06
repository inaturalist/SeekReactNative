// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/challenges";
import logos from "../../assets/logos";

type Props = {
  navigation: any,
  challenge: Object
}

const Challenges = ( { navigation, challenge }: Props ) => (
  <View style={styles.container}>
  {console.log( challenge, "challenge" )}
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
      <View style={styles.challengeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.challengeHeader}>
            {i18n.t( challenge.month ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.challengeName}>
            {i18n.t( challenge.name ).toLocaleUpperCase()}
          </Text>
        </View>
        <View style={styles.centeredContent}>
          <View style={styles.row}>
            <Image source={logos.op} />
            <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
          </View>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => navigation.navigate( "ChallengeDetails", { index: challenge.index } )}
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
      </View>
    </View>
  </View>
);

export default Challenges;
