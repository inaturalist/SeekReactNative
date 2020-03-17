import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Checkbox from "react-native-check-box";

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
      <View style={[styles.row, styles.margin]}>
        <Checkbox
          checkBoxColor="#979797"
          isChecked={scientificNames}
          onClick={() => setScientificNames( !scientificNames )}
          style={styles.checkBox}
        />
        <Text style={styles.text}>
          {i18n.t( "settings.scientific_names" )}
        </Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
