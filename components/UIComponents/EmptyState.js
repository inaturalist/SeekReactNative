// @flow

import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/emptyState";
import GreenButton from "./Buttons/GreenButton";

const EmptyState = (): React.Node => {
  const navigation = useNavigation();
  const { name } = useRoute();
  const obsScreen = name === "Observations";

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {obsScreen
          ? i18n.t( "observations.no_obs" ).toLocaleUpperCase()
          : i18n.t( "notifications.none" ).toLocaleUpperCase()}
      </Text>
      <Text style={styles.text}>
        {obsScreen
          ? i18n.t( "observations.help" )
          : i18n.t( "notifications.about" )}
      </Text>
      {obsScreen && (
        <View style={styles.margin}>
          <GreenButton
            handlePress={() => navigation.navigate( "Camera" )}
            text="observations.open_camera"
          />
        </View>
      )}
    </View>
  );
};

export default EmptyState;
