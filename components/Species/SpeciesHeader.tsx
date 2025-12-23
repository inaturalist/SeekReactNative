import React, { useCallback } from "react";
import { BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import SpeciesPhotos from "./SpeciesPhotos";
import { viewStyles } from "../../styles/species/species";
import { getRoute, StoredRoutes } from "../../utility/helpers";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import { resetRouter } from "../../utility/navigationHelpers";
import SpeciesName from "./SpeciesName";
import IconicTaxaName from "./IconicTaxaName";

interface Props {
  readonly loading: boolean;
  readonly photos: {
    attribution: string;
    license_code: string;
    medium_url: string;
  }[];
  readonly taxon: {
    scientificName: string;
    iconicTaxonId: number;
  };
  readonly id: number;
  readonly selectedText: boolean;
  readonly highlightSelectedText: ( ) => void;
}

const SpeciesHeader = ( { loading, photos, taxon, id, selectedText, highlightSelectedText }: Props ) => {
  const navigation = useNavigation( );

  const iconicTaxonId = taxon && taxon.iconicTaxonId;

  const backAction = useCallback( async ( ) => {
    const routeName = await getRoute( );
    if ( routeName ) {
      // ChallengeDetails, Observations, Home, or Match, or SeekYearInReview
      if ( routeName === StoredRoutes.SideMenu
        || routeName === StoredRoutes.Home
        || routeName === StoredRoutes.Match
        || routeName === StoredRoutes.Observations
        || routeName === StoredRoutes.SeekYearInReview
        || routeName === StoredRoutes.ChallengeDetails
      ) {
        navigation.popTo( "Drawer", { screen: routeName } );
      } else {
        navigation.popTo( routeName );
      }
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

      const backHandler = BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => backHandler.remove();
    }, [backAction] )
  );

  return (
    <>
      <CustomBackArrow handlePress={backAction} style={viewStyles.backButton} />
      <SpeciesPhotos loading={loading} photos={photos} id={id} />
      <IconicTaxaName loading={loading} iconicTaxonId={iconicTaxonId} />
      <SpeciesName
        loading={loading}
        id={id}
        taxon={taxon}
        selectedText={selectedText}
        highlightSelectedText={highlightSelectedText}
      />
    </>
  );
};

export default SpeciesHeader;
