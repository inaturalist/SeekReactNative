import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../../i18n";
import styles from "../../../styles/posting/postToiNat";
import posting from "../../../assets/posting";
import { colors } from "../../../styles/global";
import icons from "../../../assets/icons";

type Props = {
  +updateObservation: ( ) => void
}

const CaptivePicker = ( updateObservation: Props ) => {
  const [captive, setCaptive] = useState( false );

  const captiveTypes = [{
    label: i18n.t( "posting.no" ),
    value: false
  },
  {
    label: i18n.t( "posting.yes" ),
    value: true
  }];

  const handleChange = ( value ) => {
    setCaptive( value );
    updateObservation( "captive", value );
  };


  return (
    <RNPickerSelect
      hideIcon
      items={captiveTypes}
      onValueChange={handleChange}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
    >
      <View style={styles.thinCard}>
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
      </View>
    </RNPickerSelect>
  );
};

export default CaptivePicker;
