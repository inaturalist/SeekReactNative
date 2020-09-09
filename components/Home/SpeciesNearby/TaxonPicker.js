// @flow

import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View
} from "react-native";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/home/speciesNearby";
import Picker from "../../../components/UIComponents/Picker";

type Props = {
  +updateTaxaType: Function,
  +error: ?string
}

const TaxonPicker = ( { updateTaxaType, error }: Props ) => {
  const [taxonType, setTaxonType] = useState( "all" );
  const list = ["all", "plants", "amphibians", "fungi", "fish", "reptiles", "arachnids", "birds", "insects", "mollusks", "mammals"];

  const types = list.map( ( item ) => ( {
    label: i18n.t( `taxon_picker.${item}` ).toLocaleUpperCase(),
    value: item
  } ) );

  const handleValueChange = ( value ) => {
    setTaxonType( value );
    updateTaxaType( value );
  };

  return (
    <Picker
      itemList={types}
      handleValueChange={handleValueChange}
      Icon={() => <></>}
      placeholder={{}}
      value={taxonType}
      disabled={error !== null}
    >
      <TouchableOpacity style={[styles.row, styles.marginLeft]}>
        <Image source={icons.filter} style={styles.image} />
        <View style={styles.whiteButton}>
          <Text style={styles.buttonText}>
            {i18n.t( `taxon_picker.${taxonType}` ).toLocaleUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </Picker>
  );
};

export default TaxonPicker;
