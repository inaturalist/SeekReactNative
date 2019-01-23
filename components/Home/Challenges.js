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
  navigation: any
}

const Challenges = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "challenges_card.header" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeHeader}>{i18n.t( "challenges_card.april" ).toLocaleUpperCase()}</Text>
        <View style={styles.row}>
          <Image source={logos.op} />
          <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
        </View>
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate( "Challenges" )}
        >
          <Text style={[styles.headerText, styles.buttonText]}>{i18n.t( "challenges_card.take_challenge" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate( "Challenges" )}
        >
          <Text style={[styles.text, styles.viewText]}>{i18n.t( "challenges_card.view_all" )}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default Challenges;
