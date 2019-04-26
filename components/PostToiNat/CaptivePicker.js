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
import icons from "../../assets/icons";

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: styles.text,
  inputAndroid: styles.text
} );

type Props = {
  updateCaptive: Function
}

class CaptivePicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      captive: null,
      types: [
        {
          label: i18n.t( "posting.yes" ),
          value: "yes"
        },
        {
          label: i18n.t( "posting.no" ),
          value: "no"
        }
      ]
    };
  }

  setCaptive( captive ) {
    const { updateCaptive } = this.props;

    this.setState( { captive } );
    updateCaptive( captive );
  }

  render() {
    const { types, captive } = this.state;

    return (
      <TouchableOpacity
        style={styles.thinCard}
        onPress={() => console.log( "clicked" )}
      >
        <Image style={styles.icon} source={icons.locationPin} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.captive" ).toLocaleUpperCase()}
          </Text>
          <RNPickerSelect
            placeholder={{}}
            hideIcon
            items={types}
            onValueChange={( value ) => {
              this.setCaptive( value );
            }}
            style={{ ...pickerSelectStyles }}
            value={captive}
            ref={( el ) => {
              this.inputRefs.picker2 = el;
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <Image style={styles.buttonIcon} source={icons.backButtonGreen} />
      </TouchableOpacity>
    );
  }
}

export default CaptivePicker;
