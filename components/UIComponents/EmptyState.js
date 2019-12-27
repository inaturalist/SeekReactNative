// @flow

import React from "react";
import {
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/emptyState";
import GreenButton from "./GreenButton";

type Props = {
  +navigation?: ?any,
  +screen?: ?string
}

const EmptyState = ( { navigation, screen }: Props ) => (
  <View style={styles.container}>
    <Text style={styles.headerText}>
      {screen === "observations"
        ? i18n.t( "observations.no_obs" ).toLocaleUpperCase()
        : i18n.t( "notifications.none" ).toLocaleUpperCase()}
    </Text>
    <Text style={styles.text}>
      {screen === "observations"
        ? i18n.t( "observations.help" )
        : i18n.t( "notifications.about" )}
    </Text>
    {screen === "observations" ? (
      <View style={styles.margin}>
        <GreenButton
          handlePress={() => navigation.navigate( "Camera" )}
          text={i18n.t( "observations.open_camera" )}
        />
      </View>
    ) : null}
  </View>
);

EmptyState.defaultProps = {
  navigation: null,
  screen: null
};

export default EmptyState;
