import React from "react";
import { ScrollView } from "react-native";

import { useLogPreview } from "../../utility/logManagementHelpers";
import StyledText from "./StyledText";

interface Props {
  navigation: any;
}

const LogFileText = ( {}: Props ) => {
  const logPreview = useLogPreview();

  if ( !logPreview ) {
    return null;
  }

  return (
    <ScrollView>
      <StyledText>{logPreview.text}</StyledText>
    </ScrollView>
  );
};

export default LogFileText;
