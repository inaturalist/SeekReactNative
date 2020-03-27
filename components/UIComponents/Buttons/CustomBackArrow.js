// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";
import { withNavigation } from "@react-navigation/compat";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";

type Props = {
  +navigation: any,
  +route: string,
  +green?: boolean
}

const CustomBackArrow = ( { navigation, route, green }: Props ) => (
  <TouchableOpacity
    accessibilityLabel={i18n.t( "accessibility.back" )}
    accessible
    onPress={() => navigation.navigate( route )}
    style={styles.backButton}
    disabled={!route}
  >
    <Image source={green ? icons.backButtonGreen : icons.backButton} />
  </TouchableOpacity>
);

CustomBackArrow.defaultProps = {
  green: false
};

export default withNavigation( CustomBackArrow );
