import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/home/speciesNearby";
import { capitalizeNames } from "../../utility/helpers";

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: styles.secondButtonText,
  inputAndroid: styles.androidSecondButtonText
} );

type Props = {
  updateTaxaType: Function
}

class TaxonPicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      taxonType: capitalizeNames( i18n.t( "taxon_picker.all" ).toLocaleUpperCase() ),
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

  setTaxonType( taxonType ) {
    const { updateTaxaType } = this.props;

    this.setState( { taxonType } );
    updateTaxaType( taxonType );
  }

  render() {
    const { types, taxonType } = this.state;

    return (
      <RNPickerSelect
        placeholder={{}}
        hideIcon
        items={types}
        onValueChange={( value ) => {
          this.setTaxonType( value );
        }}
        style={{ ...pickerSelectStyles }}
        value={taxonType}
        ref={( el ) => {
          this.inputRefs.picker2 = el;
        }}
        useNativeAndroidPickerStyle={false}
      >
        <TouchableOpacity style={styles.buttonRow}>
          <Image source={icons.filter} style={styles.image} />
          <View style={styles.whiteButton}>
            <Text style={styles.buttonText}>
              {taxonType.toLocaleUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </RNPickerSelect>
    );
  }
}

export default TaxonPicker;
