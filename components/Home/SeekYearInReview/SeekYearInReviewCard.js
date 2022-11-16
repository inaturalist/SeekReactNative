// @flow

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../../i18n";
import {
  viewStyles,
  textStyles
} from "../../../styles/home/seekYearInReview";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { AppOrientationContext } from "../../UserContext";

const SeekYearInReviewCard = ( ): Node => {
  // TODO: add logic to show this card only if it is December to January
  const { navigate } = useNavigation();
  const { isLandscape } = React.useContext( AppOrientationContext );

  const navToSeekYearInReview = () => navigate( "Donation" );

  return (
    <View style={viewStyles.whiteContainer}>
      <Text style={textStyles.header}>
        {i18n.t( "seek_year_in_review.header" ).toLocaleUpperCase()}
      </Text>
      <View style={viewStyles.textContainer}>
        <Text
          style={[
            textStyles.text,
            isLandscape && viewStyles.landscapeContainerRestrictedWidth
          ]}
        >
          {i18n.t( "seek_year_in_review.description" )}
        </Text>
      </View>
      <View style={viewStyles.marginGreenButtonLarge} />
      <GreenButton
        text="seek_year_in_review.button"
        handlePress={navToSeekYearInReview}
      />
      <View style={viewStyles.marginBottom} />
    </View>
  );
};

export default SeekYearInReviewCard;
