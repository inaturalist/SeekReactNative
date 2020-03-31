// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import styles from "../../styles/challenges/challengeMission";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import PercentCircle from "../UIComponents/PercentCircle";
import GreenText from "../UIComponents/GreenText";
import missionsDict from "../../utility/dictionaries/missionsDict";

type Props = {
  +challenge: Object
};

const ChallengeMissionCard = ( { challenge }: Props ) => {
  const [missions, setMissions] = useState( [] );
  const missionNumbers = Object.keys( missionsDict[challenge.index] )
    .map( mission => missionsDict[challenge.index][mission] );

  useEffect( () => {
    const missionList = Object.keys( challenge.missions ).map(
      mission => challenge.missions[mission]
    );
    const observationsList = Object.keys( challenge.numbersObserved ).map(
      number => challenge.numbersObserved[number]
    );

    const newMissions = [];

    missionList.forEach( ( mission, i ) => {
      newMissions.push( {
        mission,
        observations: observationsList[i]
      } );
    } );

    setMissions( newMissions );
  }, [challenge] );

  return (
    <View style={styles.header}>
      <GreenText text="challenges.your_mission" />
      <View style={styles.textContainer}>
        {missions.length > 0 && missions.map( ( item, index ) => (
          <View key={`${item}${index.toString()}`} style={styles.row}>
            <View style={styles.leftItem}>
              {missionNumbers[index] && missionNumbers[index].number === item.observations
                ? <Image source={icons.checklist} style={styles.checklist} />
                : <Text style={styles.bullets}>&#8226;</Text>}
            </View>
            <View style={styles.missionText}>
              <Text style={styles.text}>{i18n.t( item.mission )}</Text>
              <Text style={styles.greenText}>
                {i18n.t( "challenges.number_observed", { defaultValue: "{{number}}", number: item.observations } )}
              </Text>
            </View>
          </View>
        ) )}
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
  );
};

export default ChallengeMissionCard;
