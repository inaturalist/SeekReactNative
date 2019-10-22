import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/home/header";

type Props = {
  +updateTaxaType: Function
}

class TaxonPicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      taxonType: "all",
      types: [
        {
          label: i18n.t( "taxon_picker.all" ).toLocaleUpperCase(),
          value: "all"
        },
        {
          label: i18n.t( "taxon_picker.plants" ).toLocaleUpperCase(),
          value: "plants"
        },
        {
          label: i18n.t( "taxon_picker.amphibians" ).toLocaleUpperCase(),
          value: "amphibians"
        },
        {
          label: i18n.t( "taxon_picker.fungi" ).toLocaleUpperCase(),
          value: "fungi"
        },
        {
          label: i18n.t( "taxon_picker.fish" ).toLocaleUpperCase(),
          value: "fish"
        },
        {
          label: i18n.t( "taxon_picker.reptiles" ).toLocaleUpperCase(),
          value: "reptiles"
        },
        {
          label: i18n.t( "taxon_picker.arachnids" ).toLocaleUpperCase(),
          value: "arachnids"
        },
        {
          label: i18n.t( "taxon_picker.birds" ).toLocaleUpperCase(),
          value: "birds"
        },
        {
          label: i18n.t( "taxon_picker.insects" ).toLocaleUpperCase(),
          value: "insects"
        },
        {
          label: i18n.t( "taxon_picker.mollusks" ).toLocaleUpperCase(),
          value: "mollusks"
        },
        {
          label: i18n.t( "taxon_picker.mammals" ).toLocaleUpperCase(),
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
        ref={( el ) => {
          this.inputRefs.picker2 = el;
        }}
        hideIcon
        items={types}
        onValueChange={( value ) => {
          this.setTaxonType( value );
        }}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        value={taxonType}
      >
        <TouchableOpacity style={[styles.row, styles.marginLeft, styles.paddingBottom]}>
          <Image source={icons.filter} style={styles.image} />
          <View style={styles.whiteButton}>
            <Text style={styles.buttonText}>
              {i18n.t( `taxon_picker.${taxonType}` ).toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.marginBottom} />
        </TouchableOpacity>
      </RNPickerSelect>
    );
  }
}

export default TaxonPicker;
