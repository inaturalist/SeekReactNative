import React, { Component } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import styles from "../../styles/posting/postToiNat";
import posting from "../../assets/posting";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";

type Props = {
  +updateCaptive: Function
}

class CaptivePicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      captive: i18n.t( "posting.no" ),
      types: [
        {
          label: i18n.t( "posting.no" ),
          value: i18n.t( "posting.no" )
        },
        {
          label: i18n.t( "posting.yes" ),
          value: i18n.t( "posting.yes" )
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
      <RNPickerSelect
        ref={( el ) => {
          this.inputRefs.picker2 = el;
        }}
        hideIcon
        items={types}
        onValueChange={( value ) => {
          this.setCaptive( value );
        }}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        value={captive}
      >
        <TouchableOpacity
          onPress={() => console.log( "clicked" )}
          style={styles.thinCard}
        >
          <Image source={posting.captive} style={styles.icon} />
          <View style={styles.row}>
            <Text style={styles.greenText}>
              {i18n.t( "posting.captive" ).toLocaleUpperCase()}
            </Text>
            <Text style={styles.text}>
              {captive}
            </Text>
          </View>
          <Image
            source={icons.backButton}
            tintColor={colors.seekForestGreen}
            style={[styles.buttonIcon, styles.rotate]}
          />
        </TouchableOpacity>
      </RNPickerSelect>
    );
  }
}

export default CaptivePicker;
