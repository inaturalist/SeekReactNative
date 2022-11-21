// @flow

import * as React from "react";
import {
  Image,
  View
} from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/onboarding";
import Swiper from "./Swiper";
import icons from "../../assets/icons";
import StyledText from "../UIComponents/StyledText";

const OnboardingScreen = ( ): Node => (
  <Swiper>
    {[1, 2, 3].map( ( item ) => (
      <View key={`${item}`} style={viewStyles.image}>
        <Image source={icons[`onboarding${item}`]} />
        <View style={viewStyles.margin} />
        <StyledText allowFontScaling={false} style={[textStyles.text, viewStyles.center]}>
          {i18n.t( `onboarding.onboarding_${item}` )}
        </StyledText>
      </View>
    ) )}
  </Swiper>
);

export default OnboardingScreen;
