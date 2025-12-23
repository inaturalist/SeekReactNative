import * as React from "react";
import { Image, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../../i18n";
import styles from "../../../styles/posting/postToiNat";
import posting from "../../../assets/posting";
import icons from "../../../assets/icons";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

type Captive = "captive_flag";
interface Props {
  updateObservation: ( string: Captive, value: boolean ) => void;
  captive: boolean;
}

const CaptivePicker = ( { updateObservation, captive }: Props ) => {
  const captiveTypes = [{
    label: i18n.t( "posting.no" ),
    value: false,
  },
  {
    label: i18n.t( "posting.yes" ),
    value: true,
  }];

  const handleChange = ( value: boolean ) => updateObservation( "captive_flag", value );

  return (
    <RNPickerSelect
      items={captiveTypes}
      onValueChange={handleChange}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
    >
      <View style={styles.thinCard}>
        <Image source={posting.captive} />
        <View style={styles.row}>
          <StyledText style={baseTextStyles.postSectionHeader}>
            {i18n.t( "posting.captive" ).toLocaleUpperCase()}
          </StyledText>
          <StyledText style={[baseTextStyles.body, styles.text]}>
            {captive ? i18n.t( "posting.yes" ) : i18n.t( "posting.no" )}
          </StyledText>
        </View>
        <Image
          source={icons.backButton}
          style={[styles.buttonIcon, styles.rotate]}
        />
      </View>
    </RNPickerSelect>
  );
};

export default CaptivePicker;
