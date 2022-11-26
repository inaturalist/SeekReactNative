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
import { AppOrientationContext, UserContext } from "../../UserContext";
import { useCountObservationsForYear } from "../../SeekYearInReview/hooks/seekYearInReviewHooks";


const SeekYearInReviewCard = ( ): Node => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const { navigate } = useNavigation();

  const { isLandscape } = React.useContext( AppOrientationContext );
  const { userProfile } = React.useContext( UserContext );
  const countObservationsThisYear = useCountObservationsForYear( year );

  const navToSeekYearInReview = () => navigate( "SeekYearInReview" );

  const isTime = month === 0 || month === 11;
  const hasObservations =
    !!countObservationsThisYear && countObservationsThisYear > 0;
  const showCard = userProfile?.isAdmin || ( isTime && hasObservations );

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
