import React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/settings";
import LanguagePicker from "./LanguagePicker";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import DonateCard from "../UIComponents/Cards/DonateCard";
import CameraSettings from "./CameraSettings";
import SpeciesDetail from "./SpeciesDetail";
import { useAppOrientation } from "../Providers/AppOrientationProvider";

const SettingsScreen = ( ) => {
  const { isTablet } = useAppOrientation( );

  return (
    <ScrollWithHeader header="menu.settings" footer>
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
