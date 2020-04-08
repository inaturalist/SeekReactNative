// @flow

import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";

import styles from "../../../styles/home/speciesNearby";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearbyList";
import i18n from "../../../i18n";
import taxonIds from "../../../utility/dictionaries/taxonDict";
import createUserAgent from "../../../utility/userAgent";

type Props = {
  latitude: ?number,
  longitude: ?number,
  taxaType: string,
  checkInternet: Function
}

const SpeciesNearbyContainer = ( {
  taxaType,
  latitude,
  longitude,
  checkInternet
}: Props ) => {
  const [taxa, setTaxa] = useState( [] );
  const [loading, setLoading] = useState( true );

  const fetchSpeciesNearby = useCallback( ( params ) => {
    const site = "https://api.inaturalist.org/v1/taxa/nearby";
    // $FlowFixMe
    const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );
    const options = { headers: { "User-Agent": createUserAgent() } };

    fetch( `${site}?${queryString}`, options )
      .then( response => response.json() )
      .then( ( { results } ) => setTaxa( results.map( r => r.taxon ) ) )
      .catch( () => checkInternet() );
  }, [checkInternet] );

  const setParams = useCallback( () => {
    const params = {
      per_page: 20,
      lat: latitude,
      lng: longitude,
      observed_on: new Date(),
      seek_exceptions: true,
      locale: i18n.locale,
      all_photos: true // this allows for ARR license filtering
    };

    if ( taxonIds[taxaType] ) {
      // $FlowFixMe
      params.taxon_id = taxonIds[taxaType];
    }

    fetchSpeciesNearby( params );
  }, [taxaType, latitude, longitude, fetchSpeciesNearby] );

  useEffect( () => {
    if ( latitude && loading ) {
      setParams();
    } else if ( taxaType && loading ) {
      setParams();
    }
  }, [latitude, taxaType, loading, setParams] );

  useEffect( () => {
    if ( latitude || taxaType ) {
      setLoading( true );
    }
  }, [latitude, taxaType] );

  useEffect( () => {
    if ( taxa && taxa.length > 0 ) {
      setLoading( false );
    }
  }, [taxa] );

  return (
    <View style={styles.speciesNearbyContainer}>
      {loading
        ? <LoadingWheel color={colors.black} />
        : <SpeciesNearbyList taxa={taxa} />}
    </View>
  );
};

export default SpeciesNearbyContainer;
