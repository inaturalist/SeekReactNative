import React, { Component } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import styles from "../../styles/posting/postToiNat";
import posting from "../../assets/posting";

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: styles.text,
  inputAndroid: styles.text
} );

type Props = {
  updateGeoprivacy: Function
}

class GeoprivacyPicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      geoprivacy: null,
      types: [
        {
          label: i18n.t( "posting.open" ),
          value: "open"
        },
        {
          label: i18n.t( "posting.obscured" ),
          value: "obscured"
        },
        {
          label: i18n.t( "posting.private" ),
          value: "private"
        }
      ]
    };
  }

  setGeoprivacy( geoprivacy ) {
    const { updateGeoprivacy } = this.props;

    this.setState( { geoprivacy } );
    updateGeoprivacy( geoprivacy );
  }

  render() {
    const { types, geoprivacy } = this.state;

    return (
      <TouchableOpacity
        style={styles.thinCard}
        onPress={() => console.log( "clicked" )}
      >
        <Image style={styles.icon} source={posting.geoprivacy} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.geoprivacy" ).toLocaleUpperCase()}
          </Text>
          <RNPickerSelect
            placeholder={{}}
            hideIcon
            items={types}
            onValueChange={( value ) => {
              this.setGeoprivacy( value );
            }}
            style={{ ...pickerSelectStyles }}
            value={geoprivacy}
            ref={( el ) => {
              this.inputRefs.picker2 = el;
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <Image style={styles.buttonIcon} source={posting.expand} />
      </TouchableOpacity>
    );
  }
}

export default GeoprivacyPicker;
