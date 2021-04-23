// @flow

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import type { Node } from "react";

import styles from "../styles/iNatStats";
import i18n from "../i18n";
import icons from "../assets/icons";
import backgrounds from "../assets/backgrounds";
import logos from "../assets/logos";
import { localizeNumber } from "../utility/helpers";
import LoginCard from "./UIComponents/LoginCard";
import BackArrow from "./UIComponents/Buttons/BackArrow";
import GreenText from "./UIComponents/GreenText";
import createUserAgent from "../utility/userAgent";
import ScrollNoHeader from "./UIComponents/Screens/ScrollNoHeader";

const INatStatsScreen = ( ): Node => {
  const [stats, setStats] = useState( {
    observations: null,
    observers: null
  } );

  const { observations, observers } = stats;

  const fetchiNatStats = ( ) => {
    const options = { headers: { "User-Agent": createUserAgent( ) } };

    fetch( "https://www.inaturalist.org/stats/summary.json", options )
      .then( response => response.json( ) )
      .then( ( responseJson ) => {
        const totalObservations = responseJson.total_observations;
        const totalObservers = responseJson.total_observers;
        const roundedObservations = Math.round( totalObservations / 1000000 ) * 1000000;
        const roundedObservers = Math.round( totalObservers / 10000 ) * 10000;

        setStats( {
          observations: `${localizeNumber( roundedObservations )}+`,
          observers: `${localizeNumber( roundedObservers )}+`
        } );
      } ).catch( ( e ) => console.log( e ) );
  };

  useEffect( ( ) => {
    fetchiNatStats( );
  }, [] );

  const INatStatsPhotos = React.lazy( ( ) => import( "./iNatStatsPhotos" ) );

  return (
    <ScrollNoHeader>
      <View style={styles.whiteContainer}>
        <BackArrow green />
        <View style={styles.logoContainer}>
          <Image source={logos.wordmark} style={styles.logo} />
        </View>
        <Image source={backgrounds.heatMap} style={styles.heatMap} />
        <View style={styles.missionContainer}>
          <GreenText smaller text="inat_stats.global_observations" />
          <Image source={logos.bird} style={styles.bird} />
          <Text style={styles.numberText}>{observations}</Text>
          <GreenText smaller text="inat_stats.naturalists_worldwide" />
          <Text style={styles.numberText}>{observers}</Text>
          <Image
            source={icons.iNatExplanation}
            style={styles.explainImage}
          />
          <Text style={styles.missionHeaderText}>{i18n.t( "inat_stats.seek_data" )}</Text>
          <Text style={styles.missionText}>{i18n.t( "inat_stats.about_inat" )}</Text>
        </View>
        <React.Suspense fallback={null}>
          <INatStatsPhotos />
        </React.Suspense>
        <LoginCard />
      </View>
    </ScrollNoHeader>
  );
};

export default INatStatsScreen;
