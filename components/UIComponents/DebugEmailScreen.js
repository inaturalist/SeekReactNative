// @flow

import React, { useState, useEffect } from "react";
import { View, Alert, Platform } from "react-native";
import Mailer from "react-native-mail";
import { getVersion, getBuildNumber, getSystemName } from "react-native-device-info";
import RNFS from "react-native-fs";

import GreenButton from "./Buttons/GreenButton";
import styles from "../../styles/uiComponents/debugAndroid";
import { pathLogs } from "../../utility/dirStorage";
import ViewWithHeader from "./Screens/ViewWithHeader";
import CopyButton from "./Buttons/CopyButton";
import StyledText from "./StyledText";
import i18n from "../../i18n";
// import LogFileText from "./LogFileText";

const DebugEmailScreen = ( ): React.Node => {
  // Log file content state
  const [logContents, setLogContents] = useState( "" );

  // Get log file contents on initial render
  useEffect( ( ) => {
    async function fetchLogContents( ) {
      const contents = await RNFS.readFile( pathLogs );
      setLogContents( contents );
    }
    fetchLogContents( );
  }, [ ] );

  const appVersion = getVersion( );
  const buildVersion = getBuildNumber( );
  const device = getSystemName( );

  const emailParams = {
    subject: `Seek ${device} Logs (version ${appVersion} - ${buildVersion})`,
    helpEmail: "help+seek@inaturalist.org"
  };

  const sendEmailAttachment = ( ) => {
    Mailer.mail(
      {
        subject: emailParams.subject,
        recipients: [emailParams.helpEmail],
        bccRecipients: [],
        isHTML: true,
        attachments: [
          {
            path: pathLogs, // The absolute path of the file from which to read data.
            mimeType: "text/plain"
          }
        ]
      },
      ( error, event ) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "Ok",
              onPress: () => console.log( "OK: Email Error Response" )
            },
            {
              text: "Cancel",
              onPress: () => console.log( "CANCEL: Email Error Response" )
            }
          ],
          { cancelable: true }
        );
      }
    );
  };

  return (
    <ViewWithHeader header="inat_signup.email">
      <View style={styles.background}>
        <View style={styles.center}>
          {Platform.OS === "android" ? (
            <GreenButton handlePress={sendEmailAttachment} text="debug.logs" />
          ) : (
            <CopyButton
              stringToCopy={logContents}
              handleHighlight={() => console.log( "highlighted" )}
            >
              <StyledText>{i18n.t( "debug.copy_logs" )}</StyledText>
            </CopyButton>
          )}
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
