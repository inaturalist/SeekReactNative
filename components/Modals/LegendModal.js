// @flow

import * as React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/rangeMap";
import icons from "../../assets/icons";
import WhiteModal from "../UIComponents/Modals/WhiteModal";

type Props = {
  +closeModal: Function
}

const Legend = ( { closeModal }: Props ): React.Node => {
  const renderText = ( text ) => (
    <Text style={textStyles.text}>
      {text}
    </Text>
  );

  return (
    <WhiteModal closeModal={closeModal}>
      <View style={viewStyles.legendHeader}>
        <Text style={textStyles.whiteText}>
          {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View>
        <View style={viewStyles.marginSmall} />
        <View style={viewStyles.row}>
          <Image source={icons.legendLocation} style={viewStyles.marginHorizontal} />
          {renderText( i18n.t( "species_detail.current_location" ) )}
        </View>
        <View style={viewStyles.row}>
          <Image source={icons.legendCamera} />
          {renderText( i18n.t( "species_detail.obs" ) )}
        </View>
        <View style={viewStyles.row}>
          <Image source={icons.legendObs} />
          {renderText( i18n.t( "species_detail.obs_inat" ) )}
        </View>
        <View style={viewStyles.marginLarge} />
      </View>
    </WhiteModal>
  );
};

export default Legend;
