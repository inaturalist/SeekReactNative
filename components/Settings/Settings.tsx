import React, { useContext } from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/settings";
import { useAppOrientation } from "../Providers/AppOrientationProvider";
import AccountDeletion from "../UIComponents/AccountDeletion";
import DonateCard from "../UIComponents/Cards/DonateCard";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { UserContext } from "../UserContext";
import CameraSettings from "./CameraSettings";
import LanguagePicker from "./LanguagePicker";
import SpeciesDetail from "./SpeciesDetail";

const SettingsScreen = ( ) => {
  const { isTablet } = useAppOrientation( );
  const { login } = useContext( UserContext );

  return (
    <ScrollWithHeader header="menu.settings" footer>
      <View style={[
        viewStyles.marginHorizontal,
        viewStyles.marginTop,
        isTablet && viewStyles.tabletContainer,
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
