// @flow
import * as React from "react";
import { View, Text } from "react-native";

import SpeciesTaxonomy from "./SpeciesTaxonomy";
import Padding from "../UIComponents/Padding";
import { viewStyles, textStyles } from "../../styles/species/species";
import i18n from "../../i18n";
import { useSeenTaxa } from "../../utility/customHooks";
import SpeciesError from "./SpeciesError";

type Props = {
  +details: Object,
  +id: number,
  +predictions: ?Array<Object>,
  +checkForInternet: Function,
}

const SpeciesContainer = ( {
  id,
  details,
  predictions,
  checkForInternet
}: Props ): React.Node => {
  const ancestors = details && details.ancestors;

  const seenTaxa = useSeenTaxa( id );

  const renderHumanCard = ( ) => (
    <View style={viewStyles.textContainer}>
      <Text style={textStyles.humanText}>{i18n.t( "species_detail.you" )}</Text>
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
