// @flow

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import inatjs from "inaturalistjs";

import styles from "../styles/iNatStats";
import i18n from "../i18n";
import icons from "../assets/icons";
import backgrounds from "../assets/backgrounds";
import logos from "../assets/logos";
import {
  capitalizeNames,
  shuffleList,
  localizeNumber
} from "../utility/helpers";
import { localizeAttributions } from "../utility/photoHelpers";
import LoadingWheel from "./UIComponents/LoadingWheel";
import LoginCard from "./UIComponents/LoginCard";
import BackArrow from "./UIComponents/Buttons/BackArrow";
import GreenText from "./UIComponents/GreenText";
import createUserAgent from "../utility/userAgent";
import HorizontalScroll from "./UIComponents/HorizontalScroll";
import ScrollNoHeader from "./UIComponents/Screens/ScrollNoHeader";

const INatStatsScreen = () => {
  const [stats, setStats] = useState( {
    observations: null,
    observers: null
  } );
  const [photos, setPhotos] = useState( [] );

  const { observations, observers } = stats;

  const fetchProjectPhotos = ( ) => {
    const params = {
      project_id: 29905,
      photos: true,
      quality_grade: "research",
      lrank: "species",
      hrank: "species",
      locale: i18n.locale
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.search( params, options ).then( ( { results } ) => {
      const taxa = results.map( ( r ) => r.taxon );

      const projectPhotos = [];

      taxa.forEach( ( photo ) => {
        const { defaultPhoto } = photo;

        if ( !defaultPhoto ) {
          return;
        }

        if ( defaultPhoto.license_code && defaultPhoto.original_dimensions ) {
          // some original dimensions can be null
          if ( defaultPhoto.original_dimensions.width > defaultPhoto.original_dimensions.height ) {
            projectPhotos.push( {
              photoUrl: defaultPhoto.medium_url,
              commonName: photo.preferred_common_name
                ? capitalizeNames( photo.preferred_common_name )
                : capitalizeNames( photo.iconic_taxon_name ),
              attribution: localizeAttributions(
                defaultPhoto.attribution,
                defaultPhoto.license_code,
                "iNatStats"
              )
            } );
          }
        }
      } );

      const randomEightPhotos = shuffleList( projectPhotos ).splice( 0, 8 );
      setPhotos( randomEightPhotos );
    } ).catch( ( e ) => console.log( e, "couldn't fetch project photos" ) );
  };

  const fetchiNatStats = ( ) => {
    const options = { headers: { "User-Agent": createUserAgent() } };

    fetch( "https://www.inaturalist.org/stats/summary.json", options )
      .then( response => response.json() )
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

  const renderPhotos = () => photos.map( ( photo ) => (
    <View key={`image${photo.photoUrl}`} style={styles.center}>
      <Image
        source={{ uri: photo.photoUrl }}
        style={styles.image}
      />
      <Text style={[styles.missionText, styles.caption]}>
        {`${photo.commonName} ${i18n.t( "inat_stats.by" )} ${photo.attribution}`}
      </Text>
    </View>
  ) );

  useEffect( () => {
    fetchiNatStats( );
    fetchProjectPhotos( );
  }, [] );

  const photoList = renderPhotos();

  return (
    <ScrollNoHeader>
      <BackArrow green />
      <View style={styles.logoContainer}>
        <Image source={logos.wordmark} style={styles.logo} />
      </View>
      <View style={styles.headerMargin} />
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
      {photoList.length !== 8 ? (
        <View style={styles.photoContainer}>
          <LoadingWheel color="black" />
        </View>
      ) : <HorizontalScroll photoList={photoList} screen="iNatStats" />}
      <LoginCard />
    </ScrollNoHeader>
  );
};

export default INatStatsScreen;
