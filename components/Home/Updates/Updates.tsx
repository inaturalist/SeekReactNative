import React from "react";
import { View, Image } from "react-native";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { viewStyles, imageStyles, textStyles } from "../../../styles/home/updates";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import GreenText from "../../UIComponents/GreenText";

const Updates = ( ) => (
  <View style={viewStyles.container}>
    <View style={viewStyles.header}>
      <GreenText text="updates_card.header" />
    </View>
    <View style={[viewStyles.row, viewStyles.center]}>
      <Image source={icons.cameraGreen} style={imageStyles.image} />
      <View>
        <StyledText style={[baseTextStyles.emptyState, textStyles.textWidth]}>
          {i18n.t( "updates_card.updated_id_model" )}
        </StyledText>
        <StyledText style={[baseTextStyles.body, textStyles.text, textStyles.textWidth]}>
          {i18n.t( "updates_card.over_x_species" )}
        </StyledText>
      </View>
    </View>
  </View>
);

export default Updates;
