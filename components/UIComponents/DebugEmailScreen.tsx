import React, { useState } from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/debugAndroid";
import {
  emailRecentLogs,
  useLogPreview,
} from "../../utility/logManagementHelpers";
import CopyButton from "./Buttons/CopyButton";
import GreenButton from "./Buttons/GreenButton";
import ViewWithHeader from "./Screens/ViewWithHeader";
import StyledText from "./StyledText";
// import LogFileText from "./LogFileText";

const DebugEmailScreen = ( ) => {
  const logPreview = useLogPreview();
  const [failed, setFailed] = useState( false );

  const sendEmailAttachment = ( ) => {
    emailRecentLogs( ( error, event ) => {
      setFailed( true );
      console.log( "error", error );
      console.log( "event", event );
    } );
  };

  return (
    <ViewWithHeader header="inat_signup.email">
      <View style={styles.background}>
        <View style={styles.center}>
          <GreenButton handlePress={sendEmailAttachment} text="debug.logs" />
          { failed && logPreview &&
            <CopyButton
              stringToCopy={logPreview.text}
              handleHighlight={() => console.log( "highlighted" )}
            >
              <StyledText>{i18n.t( "debug.copy_logs" )}</StyledText>
            </CopyButton>
          }
        </View>
        {/*
          This component is not currently used, but it's useful for debugging, showing the contents of the log file.
          <LogFileText />
        */}
      </View>
    </ViewWithHeader>
  );
};

export default DebugEmailScreen;
