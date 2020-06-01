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
  +updateGeoprivacy: Function
}

class GeoprivacyPicker extends Component<Props> {
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      geoprivacy: i18n.t( "posting.open" ),
      types: [
        {
          label: i18n.t( "posting.open" ),
          value: i18n.t( "posting.open" )
        },
        {
          label: i18n.t( "posting.obscured" ),
          value: i18n.t( "posting.obscured" )
        },
        {
          label: i18n.t( "posting.private" ),
          value: i18n.t( "posting.private" )
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
      <RNPickerSelect
        ref={( el ) => {
          this.inputRefs.picker2 = el;
        }}
        hideIcon
        items={types}
        onValueChange={( value ) => {
          this.setGeoprivacy( value );
        }}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        value={geoprivacy}
      >
        <TouchableOpacity
          style={styles.thinCard}
        >
          <Image source={posting.geoprivacy} style={styles.icon} />
          <View style={styles.row}>
            <Text style={styles.greenText}>
              {i18n.t( "posting.geoprivacy" ).toLocaleUpperCase()}
            </Text>
            <Text style={styles.text}>
              {geoprivacy}
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

export default GeoprivacyPicker;
