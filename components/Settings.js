import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";

import SafeAreaView from "./UIComponents/SafeAreaView";
import GreenHeader from "./UIComponents/GreenHeader";
import i18n from "../i18n";
import styles from "../styles/settings";
import { toggleScientificNames, getScientificNames } from "../utility/settingsHelpers";

const SettingsScreen = () => {
  const [scientificNames, setScientificNames] = useState( false );

  useEffect( () => toggleScientificNames( scientificNames ), [scientificNames] );

  useEffect( () => {
    const fetchNames = async () => {
      const names = await getScientificNames();
      setScientificNames( names );
    };

    fetchNames();
  }, [] );

  return (
    <View style={styles.background}>
      <SafeAreaView />
      <GreenHeader header="menu.settings" />
      <View style={[styles.row, styles.margin, styles.marginHorizontal]}>
        <Text style={styles.text}>
          {i18n.t( "settings.scientific_names" )}
        </Text>
        <Switch
          onValueChange={() => setScientificNames( !scientificNames )}
          value={scientificNames}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
