import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { baseTextStyles } from "../../styles/textStyles";
import { textStyles, viewStyles } from "../../styles/uiComponents/emptyState";
import GreenButton from "./Buttons/GreenButton";
import StyledText from "./StyledText";

const EmptyState = () => {
  const navigation = useNavigation();
  const { name } = useRoute();
  const obsScreen = name === "Observations";

  return (
    <View style={viewStyles.container}>
      <StyledText style={[baseTextStyles.header, textStyles.headerText]}>
        {obsScreen
          ? i18n.t( "observations.no_obs" ).toLocaleUpperCase()
          : i18n.t( "notifications.none" ).toLocaleUpperCase()}
      </StyledText>
      <StyledText style={[baseTextStyles.body, textStyles.text]}>
        {obsScreen
          ? i18n.t( "observations.help" )
          : i18n.t( "notifications.about" )}
      </StyledText>
      {obsScreen && (
        <View style={viewStyles.greenButtonMargin}>
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
