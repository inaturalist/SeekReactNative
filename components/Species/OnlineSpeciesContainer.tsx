import * as React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/species/species";
import { baseTextStyles } from "../../styles/textStyles";
import {
  useLocationPermission,
  useTruncatedUserCoords,
} from "../../utility/customHooks";
import { useRegion } from "../../utility/customHooks/useRegion";
import { useSeenTaxa } from "../../utility/customHooks/useSeenTaxa";
import { formatShortMonthDayYear } from "../../utility/dateHelpers";
import Padding from "../UIComponents/Padding";
import StyledText from "../UIComponents/StyledText";
import About from "./OnlineOnlyCards/About";
import INatObs from "./OnlineOnlyCards/INatObs";
import SeenDate from "./OnlineOnlyCards/SeenDate";
import SimilarSpecies from "./OnlineOnlyCards/SimilarSpecies";
import SpeciesChart from "./OnlineOnlyCards/SpeciesChart";
import SpeciesMap from "./OnlineOnlyCards/SpeciesMap";
import SpeciesStats from "./OnlineOnlyCards/SpeciesStats";
import SpeciesTaxonomy from "./SpeciesTaxonomy";

interface Props {
  readonly loading: boolean;
  readonly id: number;
  readonly details: {
    stats: {
      endangered: boolean;
    };
    about: string;
    wikiUrl: string;
    ancestors: {
      rank: string;
      name: string;
      preferred_common_name: string | void | null;
    }[];
    timesSeen: number;
  };
  readonly predictions: {
    taxon_id: number;
    rank: number;
    name: string;
  }[];
  readonly scientificName: string;
}

const OnlineSpeciesContainer = ( {
  loading,
  id,
  details,
  predictions,
  scientificName,
}: Props ) => {
  const {
    stats,
    about,
    wikiUrl,
    ancestors,
    timesSeen,
  } = details;

  const seenTaxa = useSeenTaxa( id );
  const seenDate = ( seenTaxa && seenTaxa.date ) ? formatShortMonthDayYear( seenTaxa.date ) : null;
  const granted = useLocationPermission( );
  const coords = useTruncatedUserCoords( granted );
  // TODO: the types for this are not quite right yet
  const region = useRegion( coords, seenTaxa );

  const renderHumanCard = ( ) => {
    return !loading ?
      <View style={viewStyles.textContainer}>
        <StyledText style={[baseTextStyles.bodyItalic, textStyles.humanText]}>{i18n.t( "species_detail.you" )}</StyledText>
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
