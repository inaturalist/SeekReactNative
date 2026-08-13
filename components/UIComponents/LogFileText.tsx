import type { PropsWithChildren } from "react";
import React from "react";
import { ScrollView } from "react-native";

import { useLogPreview } from "../../utility/logManagementHelpers";
import StyledText from "./StyledText";

const LogFileText = ( {}: PropsWithChildren ) => {
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
