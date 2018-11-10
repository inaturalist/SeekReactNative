// @flow

import React from "react";

import {
  ImageBackground,
  View
} from "react-native";

import ChallengeGrid from "./ChallengeGrid";
import ChallengeHeader from "./ChallengeHeader";
import ChallengeFooter from "./ChallengeFooter";
import LoadingWheel from "../LoadingWheel";
import styles from "../../styles/challenges";

type Props = {
  badgeCount: number,
  speciesSeen: ?boolean,
  bannerText: string,
  speciesCount: number,
  latitude: number,
  loading: boolean,
  longitude: number,
  location: string,
  navigation: Function,
  taxa: Array<Object>,
  taxaType: string,
  setTaxonId: Function,
  updateLocation: Function,
  reverseGeocodeLocation: Function
}

const ChallengeScreen = ( {
  badgeCount,
  speciesSeen,
  bannerText,
  speciesCount,
  latitude,
  loading,
  longitude,
  location,
  navigation,
  setTaxonId,
  taxa,
  taxaType,
  updateLocation
}: Props ) => {
  const challenges = loading ? <LoadingWheel /> : (
    <ChallengeGrid
      navigation={navigation}
      taxa={taxa}
      latitude={latitude}
      longitude={longitude}
      location={location}
    />
  );

  return (
    <View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require( "../../assets/backgrounds/background.png" )}
      >
        <ChallengeHeader
          latitude={latitude}
          longitude={longitude}
          location={location}
          navigation={navigation}
          updateLocation={updateLocation}
          setTaxonId={setTaxonId}
          taxaType={taxaType}
          speciesSeen={speciesSeen}
          bannerText={bannerText}
        />
        {challenges}
        <ChallengeFooter
          latitude={latitude}
          longitude={longitude}
          navigation={navigation}
          badgeCount={badgeCount}
          speciesCount={speciesCount}
        />
      </ImageBackground>
    </View>
  );
};

export default ChallengeScreen;
