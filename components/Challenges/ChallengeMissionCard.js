// @flow

import React from "react";
import {
  View,
  Text,
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
  const missionNumbers = Object.keys( missionsDict[challenge.index] )
    .map( mission => missionsDict[challenge.index][mission] );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "challenges.your_mission" ).toLocaleUpperCase()}
        </Text>
        <View style={styles.textContainer}>
          {missions.map( ( item, index ) => (
            <View style={styles.row} key={`${item}${index}`}>
              <View style={styles.leftItem}>
                {missionNumbers[index].number === item.observations
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
          ) )
          }
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
};

export default ChallengeMissionCard;
