// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/home/speciesNearby";
import LoadingWheel from "../UIComponents/LoadingWheel";
import Error from "./Error";
import { colors } from "../../styles/global";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";

type Props = {
  +taxa: Array,
  +loading: boolean,
  +navigation: any,
  +requestAndroidPermissions: Function,
  +error: string
}

const SpeciesNearby = ( {
  taxa,
  loading,
  navigation,
  requestAndroidPermissions,
  error
}: Props ) => {
  let species;

  if ( loading ) {
    species = (
      <LoadingWheel color={colors.black} />
    );
  } else if ( error ) {
    species = (
      <Error
        error={error}
        requestAndroidPermissions={requestAndroidPermissions}
      />
    );
  } else {
    species = (
      <SpeciesNearbyList navigation={navigation} taxa={taxa} />
    );
  }

  return (
    <View style={styles.speciesNearbyContainer}>
      {species}
    </View>
  );
};

export default SpeciesNearby;
