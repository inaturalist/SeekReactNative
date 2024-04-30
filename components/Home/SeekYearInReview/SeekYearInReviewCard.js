// @flow

import React from "react";
import { View } from "react-native";
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
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";


const SeekYearInReviewCard = ( ): Node => {
  // The year to show stats for
  const now = new Date();
  let year = now.getFullYear();
  const month = now.getMonth();
  // If it's January, show stats for the previous year
  if ( month === 0 ) {
    year -= 1;
  }
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
      <StyledText style={[baseTextStyles.header, textStyles.header]}>
        {i18n.t( "seek_year_in_review.header" ).toLocaleUpperCase()}
      </StyledText>
      <View style={viewStyles.textContainer}>
        <StyledText
          style={[
            baseTextStyles.body,
            isLandscape && viewStyles.landscapeContainerRestrictedWidth
          ]}
        >
          {i18n.t( "seek_year_in_review.description" )}
        </StyledText>
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
