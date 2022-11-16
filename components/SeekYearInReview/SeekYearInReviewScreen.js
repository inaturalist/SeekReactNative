// @flow

import React, { useContext } from "react";
import { View } from "react-native";
import type { Node } from "react";

import { viewStyles } from "../../styles/seekYearInReview/seekYearInReview";
import { AppOrientationContext } from "../UserContext";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";

const SeekYearInReviewScreen = (): Node => {
  const { isTablet } = useContext( AppOrientationContext );

  return (
    <ScrollWithHeader header="seek_year_in_review.header" footer>
      <View
        style={[
          viewStyles.textContainer,
          isTablet && viewStyles.tabletContainer
        ]}
      />
    </ScrollWithHeader>
  );
};

export default SeekYearInReviewScreen;
