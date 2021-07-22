// @flow

import React, { useContext, useMemo, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import type { Node } from "react";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { viewStyles, textStyles, imageStyles } from "../../../styles/home/speciesNearby";
import Picker from "../../../components/UIComponents/Picker";
import { SpeciesNearbyContext } from "../../UserContext";

type Props = {
  +updateTaxaType: Function,
  +error: ?string
}

const TaxonPicker = ( { updateTaxaType, error }: Props ): Node => {
  const { speciesNearby } = useContext( SpeciesNearbyContext );
  const { taxaType } = speciesNearby;

  const types = useMemo( () => {
    const list = ["all", "plants", "amphibians", "fungi", "fish", "reptiles", "arachnids", "birds", "insects", "mollusks", "mammals"];

    return list.map( ( item ) => ( {
      label: i18n.t( `taxon_picker.${item}` ).toLocaleUpperCase(),
      value: item
    } ) );
  }, [] );

  const handleValueChange = useCallback( ( value ) => updateTaxaType( value ), [updateTaxaType] );

  const renderTaxonPicker = useMemo( () => (
    <TouchableOpacity style={[viewStyles.row, viewStyles.marginLeft]}>
      <Image source={icons.filter} style={imageStyles.image} />
      <View style={viewStyles.whiteButton}>
        <Text style={textStyles.buttonText}>
          {i18n.t( `taxon_picker.${taxaType}` ).toLocaleUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  ), [taxaType] );

  return (
    <Picker
      itemList={types}
      handleValueChange={handleValueChange}
      disabled={error !== null}
    >
      {renderTaxonPicker}
    </Picker>
  );
};

export default TaxonPicker;
