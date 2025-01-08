import * as React from "react";
import {
  View,
  Image
} from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/modals/warningModal";
import { dimensions } from "../../styles/global";
import icons from "../../assets/icons";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  closeModal: ( ) => void;
}

const WarningModal = ( { closeModal }: Props ) => (
  <WhiteModal
    closeModal={closeModal}
    noButton
    width={dimensions.height > 570 ? 337 : 320}
    accessibilityLabel={i18n.t( "accessibility.warning_modal" )}
  >
    <View style={viewStyles.header}>
      <StyledText allowFontScaling={false} style={[baseTextStyles.button, textStyles.headerText]}>
        {i18n.t( "warning.remember" ).toLocaleUpperCase()}
      </StyledText>
    </View>
    <View style={viewStyles.marginTop} />
    <StyledText
      allowFontScaling={false}
      style={[baseTextStyles.body, textStyles.wideText]}
    >
      {i18n.t( "warning.tip_0" )}
    </StyledText>
    <View style={viewStyles.marginSmall} />
    <View>
      {[1, 2, 3].map( ( warning ) => {
        const iconName = icons[`warning_${warning}`];
        return (
          <React.Fragment key={warning}>
            <View style={viewStyles.row}>
              <Image source={iconName} style={imageStyles.image} />
              <StyledText allowFontScaling={false} style={[baseTextStyles.body, textStyles.text]}>
                {i18n.t( `warning.tip_${warning}` )}
              </StyledText>
            </View>
            {warning !== 3 && <View style={viewStyles.margin} />}
          </React.Fragment>
        );
      } )}
      <View style={viewStyles.marginSmall} />
      <StyledText
        allowFontScaling={false}
        style={[baseTextStyles.body, textStyles.wideText]}
      >
        {i18n.t( "warning.tip_4" )}
      </StyledText>
    </View>
    <View style={viewStyles.button}>
      <GreenButton
        testID="warningContinue"
        allowFontScaling={false}
        handlePress={closeModal}
        text="onboarding.continue"
        width={dimensions.height < 570 ? 271 : 285}
      />
    </View>
  </WhiteModal>
);

export default WarningModal;
