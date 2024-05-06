import * as React from "react";
import { View } from "react-native";

import SpeciesTaxonomy from "./SpeciesTaxonomy";
import Padding from "../UIComponents/Padding";
import { viewStyles, textStyles } from "../../styles/species/species";
import i18n from "../../i18n";
import { useSeenTaxa } from "../../utility/customHooks/useSeenTaxa";
import SpeciesError from "./SpeciesError";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly details: {
    ancestors: {
      rank: string;
      name: string;
      preferred_common_name: string | void | null;
    }[];
  };
  readonly id: number;
  readonly predictions: {
    taxon_id: number;
    rank: number;
    name: string;
  }[];
  readonly checkForInternet: () => void;
}

const SpeciesContainer = ( {
  id,
  details,
  predictions,
  checkForInternet
}: Props ) => {
  const ancestors = details && details.ancestors;

  const seenTaxa = useSeenTaxa( id );

  const renderHumanCard = ( ) => (
    <View style={viewStyles.textContainer}>
      <StyledText style={[baseTextStyles.bodyItalic, textStyles.humanText]}>{i18n.t( "species_detail.you" )}</StyledText>
      <Padding />
    </View>
  );

  const renderOfflineSpeciesCards = ( ) => (
    <>
      {( ancestors || predictions ) && <SpeciesTaxonomy ancestors={ancestors} predictions={predictions} id={id} />}
      {( predictions && predictions.length > 0 ) && <Padding />}
    </>
  );

  return (
    <>
      <SpeciesError seenTaxa={seenTaxa} checkForInternet={checkForInternet} />
      {id !== 43584 ? renderOfflineSpeciesCards( ) : renderHumanCard( )}
    </>
  );
};

export default SpeciesContainer;
