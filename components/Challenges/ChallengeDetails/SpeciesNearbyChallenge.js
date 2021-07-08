// @flow

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../../styles/challenges/challengeDetails";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import TapToLoad from "../../UIComponents/SpeciesNearby/TapToLoad";
import GreenText from "../../UIComponents/GreenText";
import { useFetchMissions, useFetchTruncatedUserCoords } from "../hooks/challengeHooks";
import { fetchUnobservedChallengeTaxaIds } from "../../../utility/challengeHelpers";
import { fetchSpeciesNearby } from "../../../utility/apiCalls";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import i18n from "../../../i18n";
import SpeciesNearbyChallengeError from "./SpeciesNearbyChallengeError";

type Props = {
  challenge: Object
}

const SpeciesNearbyChallenge = ( { challenge }: Props ): Node => {
  const [taxa, setTaxa] = useState( [] );
  const [loading, setLoading] = useState( false );
  const [loaded, setLoaded] = useState( false );
  const [error, setError] = useState( null );
  const missions = useFetchMissions( challenge );
  const coords = useFetchTruncatedUserCoords( );

  const { index, percentComplete } = challenge;

  const unobservedTaxaIds = fetchUnobservedChallengeTaxaIds( missions, index );

  useEffect( ( ) => {
    const fetchSpecies = async ( params ) => {
      const taxaNearby = await fetchSpeciesNearby( params );

      if ( !Array.isArray( taxaNearby ) ) {
        setError( "unknown" );
      } else if ( taxaNearby.length === 0 ) {
        setError( "emptyList" );
      } else {
        setTaxa( taxaNearby );
      }
      setLoading( false );
      setLoaded( true );
    };
    const { latitude, longitude } = coords;

    if ( !latitude && loading ) {
      setError( "location" );
    }
    if ( unobservedTaxaIds.length > 0 && latitude !== null && loading && !loaded ) {
      const params = {
        lat: latitude,
        lng: longitude,
        taxon_id: unobservedTaxaIds.join( "," )
      };

      fetchSpecies( params );
    }
  }, [unobservedTaxaIds, coords, loading, loaded] );

  if ( percentComplete === 100 ) {
    return null;
  }

  const startLoading = ( ) => setLoading( true );

  const renderSpeciesNearby = ( ) => {
    if ( loaded && taxa.length > 0 ) {
      return <SpeciesNearbyList taxa={taxa} />;
    } else if ( !loading ) {
      return (
        <>
          <View style={viewStyles.marginMedium} />
          <TapToLoad handlePress={startLoading} />
        </>
      );
    } else if ( loading ) {
      return (
        <View style={viewStyles.loadingWheelContainer}>
          <LoadingWheel />
        </View>
      );
    } else if ( error ) {
      return <SpeciesNearbyChallengeError error={error} />;
    } else {
      return (
        <View style={viewStyles.loadingWheelContainer}>
          <Text style={textStyles.text}>{i18n.t( "challenges.no_species_nearby" )}</Text>
        </View>
      );
    }
  };

  return (
    <>
      <View style={viewStyles.textContainer}>
        <GreenText text="challenges.species_nearby" />
      </View>
      {renderSpeciesNearby( )}
      <View style={viewStyles.marginLarge} />
    </>
  );
};

export default SpeciesNearbyChallenge;
