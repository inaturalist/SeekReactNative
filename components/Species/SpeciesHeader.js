import React, { useCallback } from "react";
import { Text, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import SpeciesPhotos from "./SpeciesPhotos";
import styles from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks";
import { getRoute } from "../../utility/helpers";
import CustomBackArrow from "../../components/UIComponents/Buttons/CustomBackArrow";
import { resetRouter } from "../../utility/navigationHelpers";

type Props = {
  photos: Array<Object>,
  taxon: Object,
  id: number
}

const SpeciesHeader = ( { photos, taxon, id }: Props ) => {
  const navigation = useNavigation( );
  const commonName = useCommonName( id );

  const { scientificName, iconicTaxonId } = taxon;

  const backAction = useCallback( async ( ) => {
    const routeName = await getRoute( );
    // odd behavior at the moment -> if a user clicks through 4 species screens
    // and the last one was Great Egret, they will reload the Great Egret Species Details 4x before getting back
    // to the previous screen
    if ( routeName ) {
      // ChallengeDetails, Observations, Home, or Match
      navigation.goBack( );
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
      <CustomBackArrow handlePress={backAction} style={styles.backButton} />
      <SpeciesPhotos photos={photos} id={id} />
      {iconicTaxonId && (
        <Text style={styles.iconicTaxaText}>
          {i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase()}
        </Text>
      )}
      <Text style={styles.commonNameText}>{commonName || scientificName}</Text>
      <Text style={styles.scientificNameText}>{scientificName}</Text>
    </>
  );
};

export default SpeciesHeader;
