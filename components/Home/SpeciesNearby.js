// @flow

import React from "react";
import { View } from "react-native";

import styles from "../../styles/home/speciesNearby";
import LoadingWheel from "../UIComponents/LoadingWheel";
import Error from "./Error";
import { colors } from "../../styles/global";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";

type Props = {
  +taxa: Array<Object>,
  +loading: boolean,
  +requestAndroidPermissions: Function,
  +error: ?string
}

const SpeciesNearby = ( {
  taxa,
  loading,
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
      <SpeciesNearbyList taxa={taxa} />
    );
  }

  return (
    <View style={styles.speciesNearbyContainer}>
      {species}
    </View>
  );
};

export default SpeciesNearby;
