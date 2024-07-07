import * as React from "react";
import { Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles } from "../../styles/uiComponents/cards/donateCard";
import Button from "./Buttons/Button";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";
import { useAppOrientation } from "../Providers/AppOrientationProvider";

const AccountDeletion = ( ) => {
  if ( Platform.OS === "android" ) {
    return null;
  }
};

export default AccountDeletion;
