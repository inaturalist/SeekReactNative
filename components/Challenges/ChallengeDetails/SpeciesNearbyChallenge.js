// @flow

import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../../styles/challenges/challengeDetails";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import TapToLoad from "../../UIComponents/SpeciesNearby/TapToLoad";
import GreenText from "../../UIComponents/GreenText";
import { useFetchMissions, useFetchTruncatedUserCoords } from "../hooks/challengeHooks";
import { fetchAllObservedTaxaIds, fetchUnobservedChallengeTaxaIds } from "../../../utility/challengeHelpers";
import { fetchSpeciesNearby } from "../../../utility/apiCalls";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import i18n from "../../../i18n";
import SpeciesNearbyChallengeError from "./SpeciesNearbyChallengeError";
import { useInternetStatus } from "../../../utility/customHooks";
import { colors } from "../../../styles/global";

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
  const internet = useInternetStatus( );

  const { index, percentComplete } = challenge;

  const unobservedTaxaIds = fetchUnobservedChallengeTaxaIds( missions, index );

  const updateError = useCallback( ( newError ) => {
    if ( !error ) {
      setError( newError );
    }
  }, [error] );

  useEffect( ( ) => {
    const fetchSpecies = async ( params ) => {
      try {
        const observed = await fetchObservedSpecies( );
        params.without_taxon_id = observed.join( "," );

        const taxaNearby = await fetchSpeciesNearby( params );

        if ( !Array.isArray( taxaNearby ) ) {
          updateError( "unknown" );
        } else if ( taxaNearby.length === 0 ) {
          updateError( "emptyList" );
        } else {
          setTaxa( taxaNearby );
        }
        setLoading( false );
        setLoaded( true );
      } catch ( e ) {
        updateError( "unknown" );
      }
    };

    const fetchObservedSpecies = async ( ) => {
      return await fetchAllObservedTaxaIds( );
    };

    const { latitude, longitude } = coords;

    if ( latitude === null && loading ) {
      updateError( "location" );
      return;
    }
    if ( !internet ) {
      updateError( "internet" );
      return;
    }

    if ( unobservedTaxaIds.length > 0 && latitude !== null && loading && !loaded ) {
      const params = {
        lat: latitude,
        lng: longitude,
        taxon_id: unobservedTaxaIds.join( "," ),
        without_taxon_id: []
      };

      fetchSpecies( params );
    }
  }, [unobservedTaxaIds, coords, loading, loaded, internet, updateError] );

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
    } else if ( error ) {
      return <SpeciesNearbyChallengeError error={error} />;
    } else if ( loading ) {
      return (
        <View style={viewStyles.loadingWheelContainer}>
          <LoadingWheel color={colors.darkGray} />
        </View>
      );
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
