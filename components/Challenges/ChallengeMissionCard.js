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

  const formatLongMissionText = ( item, index ) => {
    const text = i18n.t( item.mission );
    let missionNoSubBullets = null;
    let header = "";
    let secondLevelBullets = [];

    if ( text.includes( ";\n" ) ) {
      const sections = text.split( ":\n\n" );
      header = `${sections[0]}:`;
      secondLevelBullets = sections[1] ? sections[1].split( ";\n" ) : null; // account for case where this doesn't exist
    } else {
      missionNoSubBullets = text;
    }

    const list = secondLevelBullets.map( ( bullet, i ) => (
      <View key={i.toString()} style={styles.missionRow}>
        <Image source={icons.grayBullet} style={styles.subBullets} />
        <Text style={styles.secondLevelBulletText}>{bullet.split( "-" )}</Text>
      </View>
    ) );

    const observedCount = (
      <Text style={[styles.text, styles.greenText]}>
        {i18n.t( "challenges.number_observed_plural", { count: item.observations } )}
      </Text>
    );

    return (
      <>
        {missionNumbers[index] && missionNumbers[index].number === item.observations
          ? <Image source={icons.checklist} style={[styles.checklist, styles.leftItem]} />
          : <Text allowFontScaling={false} style={[styles.bullets, styles.leftItem]}>&#8226;</Text>}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{missionNoSubBullets || header}</Text>
          {header.length > 0 && <View style={styles.marginTop} />}
          {list}
          {observedCount}
        </View>
      </>
    );
  };

  const renderMissionText = () => missions.map( ( item, i ) => (
    <View key={`${item.toString()}${i.toString()}`} style={styles.missionRow}>
      {formatLongMissionText( item, i )}
      {i === 0 && (
        <View style={styles.circleStyle}>
          {challenge.percentComplete === 100
            ? <Image source={icons.completed} />
            : <PercentCircle challenge={challenge} />}
        </View>
      )}
    </View>
  ) );

  return (
    <View style={styles.container}>
      <GreenText text="challenges.your_mission" />
      {missions.length > 0 && renderMissionText()}
    </View>
  );
};

export default ChallengeMissionCard;
