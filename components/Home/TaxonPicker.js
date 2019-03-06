import React, { Component } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import styles from "../../styles/home/speciesNearby";
import { capitalizeNames } from "../../utility/helpers";

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: styles.secondButtonText,
  inputAndroid: styles.secondButtonText
} );

type Props = {
  updateTaxaType: Function
}

class TaxonPicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      taxonType: null,
      types: [
        {
          label: capitalizeNames( i18n.t( "taxon_picker.all" ).toLocaleUpperCase() ),
          value: "all"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.plants" ).toLocaleUpperCase() ),
          value: "plants"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.amphibians" ).toLocaleUpperCase() ),
          value: "amphibians"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.fungi" ).toLocaleUpperCase() ),
          value: "fungi"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.fish" ).toLocaleUpperCase() ),
          value: "fish"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.reptiles" ).toLocaleUpperCase() ),
          value: "reptiles"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.arachnids" ).toLocaleUpperCase() ),
          value: "arachnids"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.birds" ).toLocaleUpperCase() ),
          value: "birds"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.insects" ).toLocaleUpperCase() ),
          value: "insects"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.mollusks" ).toLocaleUpperCase() ),
          value: "mollusks"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.mammals" ).toLocaleUpperCase() ),
          value: "mammals"
        }
      ]
    };
  }

  render() {
    const { types, taxonType } = this.state;
    const { updateTaxaType } = this.props;

    return (
      <RNPickerSelect
        placeholder={{}}
        hideIcon
        items={types}
        onValueChange={( value ) => {
          this.setState( {
            taxonType: value
          }, () => updateTaxaType( value ) );
        }}
        onUpArrow={() => {
          this.inputRefs.picker.togglePicker();
        }}
        onDownArrow={() => {
          this.inputRefs.company.focus();
        }}
        style={{ ...pickerSelectStyles }}
        value={taxonType}
        ref={( el ) => {
          this.inputRefs.picker2 = el;
        }}
        useNativeAndroidPickerStyle={false}
      />
    );
  }
}

export default TaxonPicker;
