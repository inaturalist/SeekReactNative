// @flow

import React from "react";

import {
  ImageBackground,
  View
} from "react-native";

import ChallengeGrid from "./ChallengeGrid";
import ChallengeHeader from "./ChallengeHeader";
import ChallengeFooter from "./ChallengeFooter";
import LoadingScreen from "../LoadingScreen";
import styles from "../../styles/challenges";

type Props = {
  capitalizeNames: Function,
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
  capitalizeNames,
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
  const challenges = loading ? <LoadingScreen /> : (
    <ChallengeGrid
      capitalizeNames={capitalizeNames}
      navigation={navigation}
      taxa={taxa}
      taxaType={taxaType}
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
        />
        {challenges}
        <ChallengeFooter navigation={navigation} speciesCount={speciesCount} />
      </ImageBackground>
    </View>
  );
};

export default ChallengeScreen;
