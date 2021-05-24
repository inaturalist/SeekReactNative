// @flow
import * as React from "react";
import {
  Image,
  Text,
  View
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/posting/postToiNat";
import posting from "../../../assets/posting";
import { colors } from "../../../styles/global";
import icons from "../../../assets/icons";
import Picker from "../../UIComponents/Picker";

type Props = {
  updateObservation: ( string, any ) => void,
  geoprivacy: string
}

const GeoprivacyPicker = ( { updateObservation, geoprivacy }: Props ): React.Node => {
  const geoprivacyTypes = [{
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
  }];

  const setGeoprivacy = ( value ) => updateObservation( "geoprivacy", value );

  const geoprivacyText = geoprivacyTypes.filter( type => type.value === geoprivacy )[0].label;

  const renderGeoprivacyPicker = React.useMemo( ( ) => (
    <View style={styles.thinCard}>
        <Image source={posting.geoprivacy} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.geoprivacy" ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.text}>
            {geoprivacyText}
          </Text>
        </View>
        {/* $FlowFixMe */}
        <Image
          source={icons.backButton}
          tintColor={colors.seekForestGreen}
          style={[styles.buttonIcon, styles.rotate]}
        />
      </View>
  ), [geoprivacyText] );

  return (
    <Picker
      itemList={geoprivacyTypes}
      handleValueChange={setGeoprivacy}
    >
      {renderGeoprivacyPicker}
    </Picker>
  );
};

export default GeoprivacyPicker;
