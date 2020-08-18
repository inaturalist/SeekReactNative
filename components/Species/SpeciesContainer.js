// @flow
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import inatjs from "inaturalistjs";
import { useIsFocused } from "@react-navigation/native";

import SpeciesStats from "./OnlineOnlyCards/SpeciesStats";
import SimilarSpecies from "./OnlineOnlyCards/SimilarSpecies";
import SpeciesChart from "./OnlineOnlyCards/SpeciesChart";
import SpeciesMap from "./OnlineOnlyCards/SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import INatObs from "./OnlineOnlyCards/INatObs";
import Padding from "../UIComponents/Padding";
import styles from "../../styles/species/species";
import i18n from "../../i18n";
import About from "./OnlineOnlyCards/About";
import SeenDate from "./OnlineOnlyCards/SeenDate";
import { formatShortMonthDayYear } from "../../utility/dateHelpers";
import { useTruncatedUserCoords, useLocationPermission, useCommonName } from "../../utility/customHooks";
import createUserAgent from "../../utility/userAgent";
import SpeciesError from "./SpeciesError";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  +details: Object,
  +id: ?number,
  +seenTaxa: ?Object,
  +fetchiNatData: Function,
  +predictions: Array<Object>,
  +checkForInternet: Function,
  +error: ?string,
  +taxon: Object
}

const SpeciesContainer = ( {
  id,
  seenTaxa,
  details,
  fetchiNatData,
  predictions,
  checkForInternet,
  error,
  taxon
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
  const commonName = useCommonName( id, isFocused );
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
          const taxonStats = results[0].taxon;
          if ( taxonStats ) {
            const {
              threatened,
              endemic,
              introduced,
              native
            } = taxonStats;

            setGreenButtons( {
              threatened,
              endemic,
              introduced,
              native,
              endangered: stats.endangered
            } );
          }
        }
      } ).catch( ( err ) => console.log( err, "err fetching native threatened etc" ) );
    };

    if ( region.latitude && id !== null && isFocused && stats ) {
      checkStats();
    } else {
      // reset state
      setGreenButtons( {} );
    }
  }, [region, id, isFocused, stats] );

  const renderOnlineOnlyCardsTop = () => (
    <>
      {showGreenButtons && <SpeciesStats stats={greenButtons} />}
      {( !error && seenDate ) && <SeenDate showGreenButtons={showGreenButtons} seenDate={seenDate} />}
      {/* about summary and url do not show up for locales like romanian */}
      {( about || wikiUrl ) && <About about={about} wikiUrl={wikiUrl} id={id} />}
    </>
  );

  const renderHumanCard = () => (
    <View style={styles.textContainer}>
      <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
      <Padding />
    </View>
  );

  const renderSpeciesCards = () => (
    <>
      {( region && !error ) && <SpeciesMap id={id} region={region} seenDate={seenDate} />}
      {( ancestors || predictions ) && <SpeciesTaxonomy ancestors={ancestors} predictions={predictions} commonName={commonName} />}
      {( predictions && predictions.length > 0 && error ) && <Padding />}
      {!error && (
        <>
          {region && <INatObs id={id} timesSeen={timesSeen} region={region} />}
          <SpeciesChart id={id} />
          <SimilarSpecies fetchiNatData={fetchiNatData} id={id} />
        </>
      )}
    </>
  );

  return (
    <View style={styles.background}>
      {error
        ? <SpeciesError seenTaxa={seenTaxa} checkForInternet={checkForInternet} />
        : renderOnlineOnlyCardsTop()}
      {id !== 43584 ? renderSpeciesCards() : renderHumanCard()}
    </View>
  );
};

export default SpeciesContainer;
