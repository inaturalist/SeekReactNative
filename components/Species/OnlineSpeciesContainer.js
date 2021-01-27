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
  +predictions: ?Array<Object>,
  +scientificName: ?string
}

const OnlineSpeciesContainer = ( {
  id,
  details,
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
      <SpeciesChart id={id} region={region} />
      <SimilarSpecies id={id} />
    </>
  );

  // some of MyObservations don't show up with this code implemented on iOS

  // if ( !region.latitude || !stats ) {
  //   return null;
  // }

  return (
    <>
      <SpeciesStats stats={stats} id={id} region={region} seenDate={seenDate} />
      {seenDate && <SeenDate seenDate={seenDate} />}
      <About about={about} wikiUrl={wikiUrl} id={id} scientificName={scientificName} />
      {id !== 43584 ? renderSpeciesCards( ) : renderHumanCard( )}
    </>
  );
};

export default OnlineSpeciesContainer;
