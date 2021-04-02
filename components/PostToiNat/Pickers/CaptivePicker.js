// @flow
import * as React from "react";
import { Image, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../../i18n";
import styles from "../../../styles/posting/postToiNat";
import posting from "../../../assets/posting";
import { colors } from "../../../styles/global";
import icons from "../../../assets/icons";

type Props = {
  updateObservation: ( string, any ) => void,
  captive: boolean
}

const CaptivePicker = ( { updateObservation, captive }: Props ): React.Node => {
  const captiveTypes = [{
    label: i18n.t( "posting.no" ),
    value: false
  },
  {
    label: i18n.t( "posting.yes" ),
    value: true
  }];

  const handleChange = ( value ) => updateObservation( "captive_flag", value );

  return (
    <RNPickerSelect
      hideIcon
      items={captiveTypes}
      onValueChange={handleChange}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
    >
      <View style={styles.thinCard}>
        <Image source={posting.captive} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.captive" ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.text}>
            {captive ? i18n.t( "posting.yes" ) : i18n.t( "posting.no" )}
          </Text>
        </View>
        {/* $FlowFixMe */}
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
