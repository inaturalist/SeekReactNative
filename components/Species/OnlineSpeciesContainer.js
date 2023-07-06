// @flow
import * as React from "react";
import { View } from "react-native";

import SpeciesStats from "./OnlineOnlyCards/SpeciesStats";
import SimilarSpecies from "./OnlineOnlyCards/SimilarSpecies";
import SpeciesChart from "./OnlineOnlyCards/SpeciesChart";
import SpeciesMap from "./OnlineOnlyCards/SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import INatObs from "./OnlineOnlyCards/INatObs";
import Padding from "../UIComponents/Padding";
import { viewStyles, textStyles } from "../../styles/species/species";
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
import StyledText from "../UIComponents/StyledText";

type Props = {
  +details: Object,
  +id: number,
  +predictions: ?Array<Object>,
  +scientificName: ?string
}

const OnlineSpeciesContainer = ( {
  loading,
  id,
  details,
  predictions,
  scientificName
}: Props ): React.Node => {
  const {
    stats,
    about,
    wikiUrl,
    ancestors,
    timesSeen
  } = details;

  const seenTaxa = useSeenTaxa( id );
  const seenDate = ( seenTaxa && seenTaxa.date ) ? formatShortMonthDayYear( seenTaxa.date ) : null;
  const granted = useLocationPermission( );
  const coords = useTruncatedUserCoords( granted );
  const region = useRegion( coords, seenTaxa );

  const renderHumanCard = ( ) => {
    return !loading ?
      <View style={viewStyles.textContainer}>
        <StyledText style={textStyles.humanText}>{i18n.t( "species_detail.you" )}</StyledText>
        <Padding />
      </View> : null;
  };

  const renderSpeciesCards = ( ) => {
    return !loading ? <>
      <SpeciesMap id={id} seenDate={seenDate} region={region} />
      {( ancestors || predictions ) && <SpeciesTaxonomy ancestors={ancestors} predictions={predictions} id={id} />}
      {!loading && (
        <>
          <INatObs id={id} timesSeen={timesSeen} region={region} />
          {/* $FlowFixMe */}
          <SpeciesChart id={id} region={region} />
          <SimilarSpecies id={id} />
        </>
      )}
    </> : null;
  };

  return (
    <>
      <SpeciesStats loading={loading} stats={stats} id={id} region={region} seenDate={seenDate} />
      {seenDate && <SeenDate loading={loading} seenDate={seenDate} />}
      <About loading={loading} about={about} wikiUrl={wikiUrl} id={id} scientificName={scientificName} />
      {id !== 43584 ? renderSpeciesCards( ) : renderHumanCard( )}
    </>
  );
};

export default OnlineSpeciesContainer;
