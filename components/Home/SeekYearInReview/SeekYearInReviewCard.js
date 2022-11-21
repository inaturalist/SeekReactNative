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
import { useCountObservationsForYear } from "../../SeekYearInReview/hooks/seekYearInReviewHooks";


const SeekYearInReviewCard = ( ): Node => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const { navigate } = useNavigation();
  const { isLandscape } = React.useContext( AppOrientationContext );
  const countObservationsThisYear = useCountObservationsForYear( year );

  const navToSeekYearInReview = () => navigate( "SeekYearInReview" );

  // TODO: replace with real check for isAdmin
  const isAdmin = true;
  const isDecember = month === 11;
  const hasObservations =
    !!countObservationsThisYear && countObservationsThisYear > 0;
  const showCard = isAdmin || ( isDecember && hasObservations );

  if ( !showCard ) {
    return null;
  }

  return (
    <View testID="yir-card" style={viewStyles.whiteContainer}>
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
