// @flow
import React from "react";
import { View, Text } from "react-native";

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
import {
  useRegion,
  useSeenTaxa,
  useLocationPermission,
  useTruncatedUserCoords
} from "../../utility/customHooks";

type Props = {
  +details: Object,
  +id: number,
  +fetchiNatData: Function,
  +predictions: Array<Object>,
  +scientificName: string
}

const OnlineSpeciesContainer = ( {
  id,
  details,
  fetchiNatData,
  predictions,
  scientificName
}: Props ) => {
  const {
    stats,
    about,
    wikiUrl,
    ancestors,
    timesSeen
  } = details;

  const seenTaxa = useSeenTaxa( id );
  const seenDate = seenTaxa ? formatShortMonthDayYear( seenTaxa.date ) : null;
  const granted = useLocationPermission();
  const coords = useTruncatedUserCoords( granted );
  const region = useRegion( coords, seenTaxa );

  const renderHumanCard = () => (
    <View style={styles.textContainer}>
      <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
      <Padding />
    </View>
  );

  const renderSpeciesCards = () => (
    <>
      <SpeciesMap id={id} seenDate={seenDate} region={region} />
      {( ancestors || predictions ) && <SpeciesTaxonomy ancestors={ancestors} predictions={predictions} id={id} />}
      <INatObs id={id} timesSeen={timesSeen} region={region} />
      <SpeciesChart id={id} />
      <SimilarSpecies fetchiNatData={fetchiNatData} id={id} />
    </>
  );

  if ( !region.latitude || !stats ) {
    return null;
  }

  // console.log( "rendering species CONTAINER", stats, region );
  return (
    <View style={styles.background}>
      <SpeciesStats stats={stats} id={id} region={region} />
      {seenDate && <SeenDate seenDate={seenDate} />}
      <About about={about} wikiUrl={wikiUrl} id={id} scientificName={scientificName} />
      {id !== 43584 ? renderSpeciesCards( ) : renderHumanCard( )}
    </View>
  );
};

export default OnlineSpeciesContainer;
