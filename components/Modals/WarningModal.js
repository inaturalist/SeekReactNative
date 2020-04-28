// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/modals/warningModal";
import { dimensions } from "../../styles/global";
import icons from "../../assets/icons";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import WhiteModal from "../UIComponents/WhiteModal";

type Props = {
  +closeModal: Function
}

const WarningModal = ( { closeModal }: Props ) => (
  <WhiteModal
    closeModal={closeModal}
    noButton
    width={dimensions.height > 570 ? 337 : 320}
  >
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "warning.remember" ).toLocaleUpperCase()}
      </Text>
    </View>
    <View style={styles.marginTop} />
    <View>
      {[1, 2, 3].map( ( warning ) => {
        const iconName = icons[`warning_${warning}`];
        return (
          <React.Fragment key={warning}>
            <View style={styles.row}>
              <Image source={iconName} style={styles.image} />
              <Text allowFontScaling={false} style={styles.text}>
                {i18n.t( `warning.tip_${warning}` )}
              </Text>
            </View>
            {warning !== 3 && <View style={styles.margin} />}
          </React.Fragment>
        );
      } )}
      <View style={styles.marginSmall} />
      <Text allowFontScaling={false} style={[styles.text, styles.wideText]}>
        {i18n.t( "warning.tip_4" )}
      </Text>
    </View>
    <View style={styles.button}>
      <GreenButton
        handlePress={() => closeModal()}
        text="onboarding.continue"
        width={dimensions.height < 570 ? 271 : 285}
      />
    </View>
  </WhiteModal>
);

export default WarningModal;
