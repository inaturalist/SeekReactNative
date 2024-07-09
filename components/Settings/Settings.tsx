import React, { useContext } from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/settings";
import LanguagePicker from "./LanguagePicker";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import DonateCard from "../UIComponents/Cards/DonateCard";
import AccountDeletion from "../UIComponents/AccountDeletion";
import CameraSettings from "./CameraSettings";
import SpeciesDetail from "./SpeciesDetail";
import { useAppOrientation } from "../Providers/AppOrientationProvider";
import { UserContext } from "../UserContext";

const SettingsScreen = ( ) => {
  const { isTablet } = useAppOrientation( );
  const { login } = useContext( UserContext );

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
        {login ? <AccountDeletion /> : null}
      </View>
    </ScrollWithHeader>
  );
};

export default SettingsScreen;
