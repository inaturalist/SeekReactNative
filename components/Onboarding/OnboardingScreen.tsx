import * as React from "react";
import {
  Image,
  View,
} from "react-native";

import icons from "../../assets/icons";
import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/onboarding";
import { baseTextStyles } from "../../styles/textStyles";
import StyledText from "../UIComponents/StyledText";
import Swiper from "./Swiper";

const OnboardingScreen = ( ) => (
  <Swiper>
    {[1, 2, 3].map( ( item ) => (
      <View key={`${item}`} style={viewStyles.image}>
        <Image source={icons[`onboarding${item}`]} />
        <View style={viewStyles.margin} />
        <StyledText allowFontScaling={false} style={[baseTextStyles.onboarding, textStyles.text, viewStyles.center]}>
          {i18n.t( `onboarding.onboarding_${item}` )}
        </StyledText>
      </View>
    ) )}
  </Swiper>
);

export default OnboardingScreen;
