// @flow

import React, { useMemo, useCallback } from "react";
import {
  TouchableOpacity,
  Image,
  View
} from "react-native";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { viewStyles, imageStyles } from "../../../styles/home/speciesNearby";
import { baseTextStyles } from "../../../styles/textStyles";
import Picker from "../../../components/UIComponents/Picker";
import StyledText from "../../UIComponents/StyledText";
import { useSpeciesNearby } from "../../Providers/SpeciesNearbyProvider";

interface Props {
  readonly updateTaxaType: ( value: string ) => void;
  readonly error?: string | null;
}

const TaxonPicker = ( { updateTaxaType, error }: Props ) => {
  const { speciesNearby } = useSpeciesNearby( );
  const { taxaType } = speciesNearby;

  const types = useMemo( () => {
    const list = ["all", "plants", "amphibians", "fungi", "fish", "reptiles", "arachnids", "birds", "insects", "mollusks", "mammals"];

    return list.map( ( item ) => ( {
      label: i18n.t( `taxon_picker.${item}` ).toLocaleUpperCase(),
      value: item
    } ) );
  }, [] );

  const handleValueChange = useCallback( ( value: string ) => updateTaxaType( value ), [updateTaxaType] );

  const renderTaxonPicker = useMemo( () => (
    <TouchableOpacity style={[viewStyles.row, viewStyles.marginLeft]}>
      <Image source={icons.filter} style={imageStyles.image} />
      <View style={viewStyles.whiteButton}>
        <StyledText style={baseTextStyles.buttonGreen}>
          {i18n.t( `taxon_picker.${taxaType}` ).toLocaleUpperCase()}
        </StyledText>
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
