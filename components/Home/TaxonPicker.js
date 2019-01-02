import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import { colors } from "../../styles/global";
import { capitalizeNames } from "../../utility/helpers";

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: {
    backgroundColor: colors.greenButton,
    borderRadius: 7,
    width: 104,
    height: 34,
    marginBottom: 21,
    color: colors.white
  },
  inputAndroid: {
    backgroundColor: colors.greenButton,
    borderRadius: 7,
    width: 104,
    height: 34,
    marginBottom: 21,
    color: colors.white
  }
} );

type Props = {
  updateTaxaType: Function
}

class TaxonPicker extends Component<Props> {
  constructor( { updateTaxaType }: Props ) {
    super();

    this.inputRefs = {};

    this.state = {
      taxonType: null,
      types: [
        {
          label: capitalizeNames( i18n.t( "taxon_picker.all" ) ),
          value: "all"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.plants" ) ),
          value: "plants"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.amphibians" ) ),
          value: "amphibians"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.fungi" ) ),
          value: "fungi"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.fish" ) ),
          value: "fish"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.reptiles" ) ),
          value: "reptiles"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.arachnids" ) ),
          value: "arachnids"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.birds" ) ),
          value: "birds"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.insects" ) ),
          value: "insects"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.mollusks" ) ),
          value: "mollusks"
        },
        {
          label: capitalizeNames( i18n.t( "taxon_picker.mammals" ) ),
          value: "mammals"
        }
      ]
    };
  }

  render() {
    const { types, taxonType } = this.state;
    const { updateTaxaType } = this.props;

    return (
      <View>
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
      </View>
    );
  }
}

export default TaxonPicker;
