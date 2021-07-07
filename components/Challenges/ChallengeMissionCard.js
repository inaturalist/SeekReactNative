// @flow

import React from "react";
import { View, Text, Image } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles, imageStyles } from "../../styles/challenges/challengeMission";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import PercentCircle from "../UIComponents/PercentCircle";
import GreenText from "../UIComponents/GreenText";
import missionsDict from "../../utility/dictionaries/missionsDict";
import { useFetchMissions } from "./hooks/challengeHooks";

type Props = {
  +challenge: Object
};

const ChallengeMissionCard = ( { challenge }: Props ): Node => {
  const missions = useFetchMissions( challenge );

  const { index, percentComplete } = challenge;
  const missionDetails = Object.keys( missionsDict[index] ).map( mission => missionsDict[index][mission] );

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
      <View key={i.toString()} style={viewStyles.missionRow}>
        <Image source={icons.grayBullet} style={viewStyles.subBullets} />
        <Text style={textStyles.secondLevelBulletText}>{bullet.split( "-" )}</Text>
      </View>
    ) );

    const observedCount = (
      <Text style={[textStyles.text, textStyles.greenText]}>
        {i18n.t( "challenges.number_observed_plural", { count: item.observations || 0 } )}
      </Text>
    );

    return (
      <>
        {missionDetails[missionIndex] && missionDetails[missionIndex].number === item.observations
          ? <Image source={icons.checklist} style={imageStyles.checklist} />
          : <Text allowFontScaling={false} style={textStyles.bullets}>&#8226;</Text>}
        <View style={viewStyles.textContainer}>
          <Text style={textStyles.text}>{missionNoSubBullets || header}</Text>
          {header.length > 0 && <View style={viewStyles.marginTop} />}
          {subBullets.length > 0 && list}
          {observedCount}
        </View>
      </>
    );
  };

  const renderMissionText = () => missions.map( ( item, i ) => (
    <View key={`${item.toString()}${i.toString()}`} style={viewStyles.missionRow}>
      {formatLongMissionText( item, i )}
      {i === 0 && (
        <View style={viewStyles.circleStyle}>
          {percentComplete === 100 ? <Image source={icons.completed} /> : <PercentCircle challenge={challenge} />}
        </View>
      )}
    </View>
  ) );

  return (
    <View style={viewStyles.container}>
      <GreenText text="challenges.your_mission" />
      {missions.length > 0 && renderMissionText( )}
    </View>
  );
};

export default ChallengeMissionCard;
