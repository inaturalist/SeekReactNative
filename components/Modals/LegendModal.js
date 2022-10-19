// @flow

import * as React from "react";
import {
  View,
  Image
} from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/rangeMap";
import icons from "../../assets/icons";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import StyledText from "../UIComponents/StyledText";

type Props = {
  +closeModal: Function
}

const Legend = ( { closeModal }: Props ): React.Node => {
  const renderText = ( text ) => (
    <StyledText style={textStyles.text}>
      {text}
    </StyledText>
  );

  return (
    <WhiteModal closeModal={closeModal}>
      <View style={viewStyles.legendHeader}>
        <StyledText style={textStyles.whiteText}>
          {i18n.t( "species_detail.legend" ).toLocaleUpperCase()}
        </StyledText>
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
