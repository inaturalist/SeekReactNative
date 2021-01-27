// @flow

import React, { useContext } from "react";
import { View, Platform } from "react-native";

import styles from "../../styles/settings";
import { UserContext } from "../UserContext";
import LanguagePicker from "./LanguagePicker";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import DonateButton from "./DonateButton";
import CameraSettings from "./CameraSettings";
import SpeciesDetail from "./SpeciesDetail";

const SettingsScreen = () => {
  const { login } = useContext( UserContext );

  return (
    <ScrollWithHeader header="menu.settings">
      <View style={[styles.marginHorizontal, styles.marginTop]}>
        <CameraSettings />
        <SpeciesDetail />
        <LanguagePicker />
        {( login && Platform.OS === "android" ) && <DonateButton />}
      </View>
    </ScrollWithHeader>
  );
};

export default SettingsScreen;
