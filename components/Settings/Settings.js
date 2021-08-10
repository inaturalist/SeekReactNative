// @flow

import React, { useContext } from "react";
import { View } from "react-native";
import type { Node } from "react";

import { viewStyles } from "../../styles/settings";
import { AppOrientationContext } from "../UserContext";
import LanguagePicker from "./LanguagePicker";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import DonateCard from "../UIComponents/Cards/DonateCard";
import CameraSettings from "./CameraSettings";
import SpeciesDetail from "./SpeciesDetail";

const SettingsScreen = ( ): Node => {
  const { isTablet } = useContext( AppOrientationContext );

  return (
    <ScrollWithHeader header="menu.settings">
      <View style={[
        viewStyles.marginHorizontal,
        viewStyles.marginTop,
        isTablet && viewStyles.tabletContainer
      ]}>
        <CameraSettings />
        <SpeciesDetail />
        <LanguagePicker />
        <DonateCard />
      </View>
    </ScrollWithHeader>
  );
};

export default SettingsScreen;
