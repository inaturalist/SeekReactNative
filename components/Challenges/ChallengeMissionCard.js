// @flow

import React from "react";
import {
  View,
  Text,
  FlatList,
  Image
} from "react-native";

import styles from "../../styles/challenges/challengeMission";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import PercentCircle from "./PercentCircle";

type Props = {
  challenge: Object,
  missions: Array<Object>
};

const ChallengeMissionCard = ( { challenge, missions }: Props ) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.your_mission" ).toLocaleUpperCase()}
      </Text>
      <View style={styles.textContainer}>
        <FlatList
          data={missions}
          keyExtractor={( item, i ) => `${item}${i}`}
          renderItem={( { item } ) => (
            <View>
              <Text style={styles.text}>
                {i18n.t( item.mission )}
              </Text>
              <Text style={styles.greenText}>
                {i18n.t( "challenges.number_observed", { defaultValue: "{{number}}", number: item.observations } )}
              </Text>
            </View>
          )}
        />
      </View>
      {challenge.percentComplete === 100 ? (
        <View style={styles.circleStyle}>
          <Image source={icons.completed} />
        </View>
      ) : (
        <View style={styles.circleStyle}>
          <PercentCircle challenge={challenge} />
        </View>
      )}
    </View>
  </View>
);

export default ChallengeMissionCard;
