// @flow

import React, { useCallback } from "react";
import { BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { Node } from "react";

import SpeciesPhotos from "./SpeciesPhotos";
import { viewStyles } from "../../styles/species/species";
import { getRoute } from "../../utility/helpers";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import { resetRouter } from "../../utility/navigationHelpers";
import SpeciesName from "./SpeciesName";
import IconicTaxaName from "./IconicTaxaName";

type Props = {
  photos: Array<Object>,
  taxon: Object,
  id: number,
  selectedText: boolean,
  highlightSelectedText: ( ) => void
}

const SpeciesHeader = ( { photos, taxon, id, selectedText, highlightSelectedText }: Props ): Node => {
  const navigation = useNavigation( );

  const iconicTaxonId = taxon && taxon.iconicTaxonId;

  const backAction = useCallback( async ( ) => {
    const routeName = await getRoute( );
    if ( routeName ) {
      // ChallengeDetails, Observations, Home, or Match
      navigation.navigate( routeName );
    } else {
      resetRouter( navigation );
    }
  }, [navigation] );

  useFocusEffect(
    useCallback( ( ) => {
      const onBackPress = ( ) => {
        backAction( );
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [backAction] )
  );

  return (
    <>
      <CustomBackArrow handlePress={backAction} style={viewStyles.backButton} />
      <SpeciesPhotos photos={photos} id={id} />
      <IconicTaxaName iconicTaxonId={iconicTaxonId} />
      <SpeciesName
        id={id}
        taxon={taxon}
        selectedText={selectedText}
        highlightSelectedText={highlightSelectedText}
      />
    </>
  );
};

export default SpeciesHeader;
