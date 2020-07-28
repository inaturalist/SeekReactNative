// @flow
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import inatjs from "inaturalistjs";
import { useIsFocused } from "@react-navigation/native";

import SpeciesStats from "./SpeciesStats";
import SimilarSpecies from "./SimilarSpecies";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import INatObs from "./INatObs";
import Padding from "../../UIComponents/Padding";
import styles from "../../../styles/species/species";
import i18n from "../../../i18n";
import About from "./About";
import SeenDate from "./SeenDate";
import { formatShortMonthDayYear } from "../../../utility/dateHelpers";
import { useTruncatedUserCoords, useLocationPermission } from "../../../utility/customHooks";
import createUserAgent from "../../../utility/userAgent";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  +details: Object,
  +id: ?number,
  +seenTaxa: ?Object,
  +fetchiNatData: Function,
  +predictions: Array
}

const NoInternetError = ( {
  id,
  seenTaxa,
  details,
  fetchiNatData,
  predictions
}: Props ) => {
  const {
    stats,
    about,
    wikiUrl,
    ancestors,
    timesSeen
  } = details;
  const isFocused = useIsFocused();
  const seenDate = seenTaxa ? formatShortMonthDayYear( seenTaxa.date ) : null;
  const granted = useLocationPermission();
  const coords = useTruncatedUserCoords( granted );
  const [region, setRegion] = useState( {} );
  const [greenButtons, setGreenButtons] = useState( {} );

  const showGreenButtons = Object.keys( greenButtons ).map(
    ( stat => greenButtons[stat] )
  ).includes( true );

  useEffect( () => {
    const setNewRegion = ( newRegion ) => {
      setRegion( {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta,
        longitudeDelta
      } );
    };
    // if user has seen observation, fetch data based on obs location
    if ( seenTaxa && seenTaxa.latitude ) {
      setNewRegion( seenTaxa );
      // otherwise, fetch data based on user location
    } else if ( coords && coords.latitude ) {
      setNewRegion( coords );
    }
  }, [coords, seenTaxa] );

  useEffect( () => {
    const checkStats = () => {
      const params = {
        per_page: 1,
        lat: region.latitude,
        lng: region.longitude,
        radius: 50,
        taxon_id: id
      };

      const options = { user_agent: createUserAgent() };

      inatjs.observations.search( params, options ).then( ( { results } ) => {
        if ( results.length > 0 ) {
          const { taxon } = results[0];
          if ( taxon ) {
            const {
              threatened,
              endemic,
              introduced,
              native
            } = taxon;

            setGreenButtons( {
              threatened,
              endemic,
              introduced,
              native
            } );
          }
        }
      } ).catch( ( err ) => console.log( err, "err fetching native threatened etc" ) );
    };

    if ( region.latitude && id !== null && isFocused ) {
      checkStats();
    }
  }, [region, id, isFocused] );

  useEffect( () => {
    if ( stats ) {
      const newStats = greenButtons;
      // it's unlikely that Seek will identify any endangered species
      // since there probably aren't enough photographs
      newStats.endangered = stats.endangered;
      setGreenButtons( newStats );
    }
  }, [stats, greenButtons] );

  return (
    <View style={styles.background}>
      {showGreenButtons && <SpeciesStats stats={greenButtons} />}
      {seenDate && <SeenDate showGreenButtons={showGreenButtons} seenDate={seenDate} />}
      {/* about summary and url do not show up for locales like romanian */}
      {( about || wikiUrl ) && <About about={about} wikiUrl={wikiUrl} id={id} />}
      {id !== 43584 ? (
        <>
          {region && <SpeciesMap id={id} region={region} seenDate={seenDate} />}
          {ancestors && <SpeciesTaxonomy ancestors={ancestors} predictions={predictions} />}
          {region && <INatObs id={id} timesSeen={timesSeen} region={region} />}
          <SpeciesChart id={id} />
          <SimilarSpecies fetchiNatData={fetchiNatData} id={id} />
        </>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
          <Padding />
        </View>
      )}
    </View>
  );
};

export default NoInternetError;
