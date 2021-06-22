// @flow

import React from "react";
import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { setSpeciesId, setRoute } from "../../utility/helpers";
import SpeciesCard from "../UIComponents/SpeciesCard";
import { useUserPhoto } from "../../utility/customHooks";
import styles from "../../styles/observations/obsCard";

type Props = {
  +item: Object,
  +openModal: Function
}

const ObservationCardAndroid = ( { item, openModal }: Props ): Node => {
  const { navigate } = useNavigation( );

  const { taxon } = item;
  const { id } = taxon;

  const photo = useUserPhoto( item );

  const handleSpeciesCardPress = ( ) => {
    setSpeciesId( id );
    setRoute( "Observations" );
    navigate( "Species" );
  };

  const handleDeletePress = ( ) => {
    console.log( "long press" );
    openModal( photo, taxon );
  };

  return (
    <Pressable
      onLongPress={handleDeletePress}
      onPress={handleSpeciesCardPress}
      style={styles.card}
    >
      <SpeciesCard
        taxon={taxon}
        photo={photo}
      />
    </Pressable>
  );
};

export default ObservationCardAndroid;
