import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

import i18n from "../../../i18n";
import {
  textStyles,
  viewStyles,
} from "../../../styles/home/seekYearInReview";
import { baseTextStyles } from "../../../styles/textStyles";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";
import { useCountObservationsForYear } from "../../SeekYearInReview/hooks/seekYearInReviewHooks";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import StyledText from "../../UIComponents/StyledText";
import { UserContext } from "../../UserContext";


const SeekYearInReviewCard = ( ) => {
  // The year to show stats for
  const now = new Date();
  let year = now.getFullYear();
  const month = now.getMonth();
  // If it's January, show stats for the previous year
  if ( month === 0 ) {
    year -= 1;
  }
  const { navigate } = useNavigation();

  const { isLandscape } = useAppOrientation();
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
            isLandscape && viewStyles.landscapeContainerRestrictedWidth,
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
