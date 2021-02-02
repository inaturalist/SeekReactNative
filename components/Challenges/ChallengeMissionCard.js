// @flow

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

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

  const { index, percentComplete } = challenge;
  const missionDetails = Object.keys( missionsDict[index] ).map( mission => missionsDict[index][mission] );

  useEffect( () => {
    const { numbersObserved } = challenge;
    const missionList = Object.keys( challenge.missions ).map( mission => challenge.missions[mission] );
    const observationsList = Object.keys( numbersObserved ).map( number => numbersObserved[number] );

    const newMissions = missionList.map( ( mission, i ) => ( {
      mission,
      observations: observationsList[i]
    } ) );

    setMissions( newMissions );
  }, [challenge] );

  const formatLongMissionText = ( item, missionIndex ) => {
    const text = i18n.t( item.mission );
    let missionNoSubBullets = null;
    let header = "";
    let subBullets = [];

    if ( text.includes( ";\n" ) ) {
      const sections = text.split( ":\n\n" );
      header = `${sections[0]}:`;
      subBullets = sections[1] ? sections[1].split( ";\n" ) : []; // account for case where this doesn't exist
    } else {
      missionNoSubBullets = text;
    }

    const list = subBullets.map( ( bullet, i ) => (
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
        {missionDetails[missionIndex] && missionDetails[missionIndex].number === item.observations
          ? <Image source={icons.checklist} style={styles.checklist} />
          : <Text allowFontScaling={false} style={styles.bullets}>&#8226;</Text>}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{missionNoSubBullets || header}</Text>
          {header.length > 0 && <View style={styles.marginTop} />}
          {subBullets.length > 0 && list}
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
          {percentComplete === 100 ? <Image source={icons.completed} /> : <PercentCircle challenge={challenge} />}
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
