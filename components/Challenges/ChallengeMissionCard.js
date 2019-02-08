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
import missionsDict from "../../utility/missionsDict";

type Props = {
  challenge: Object,
  missions: Array<Object>
};

const ChallengeMissionCard = ( { challenge, missions }: Props ) => {
  const missionNumbers = Object.keys( missionsDict[challenge.index] ).map( mission => missionsDict[challenge.index][mission] );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "challenges.your_mission" ).toLocaleUpperCase()}
        </Text>
        <FlatList
          style={styles.textContainer}
          data={missions}
          keyExtractor={( item, i ) => `${item}${i}`}
          renderItem={( { item, index } ) => (
            <View style={styles.row}>
              <View style={styles.leftItem}>
                {missionNumbers[index] === item.observations
                  ? <Image source={icons.checklist} style={styles.checklist} />
                  : <Text style={styles.bullets}>&#8226;</Text>
                }
              </View>
              <View style={styles.missionText}>
                <Text style={styles.text}>{i18n.t( item.mission )}</Text>
                <Text style={styles.greenText}>
                  {i18n.t( "challenges.number_observed", { defaultValue: "{{number}}", number: item.observations } )}
                </Text>
              </View>
            </View>
          )}
        />
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
};

export default ChallengeMissionCard;
