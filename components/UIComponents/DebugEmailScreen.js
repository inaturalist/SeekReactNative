// @flow

import * as React from "react";
import { View, Alert, Platform } from "react-native";
import Mailer from "react-native-mail";
import { getVersion, getBuildNumber, getSystemName } from "react-native-device-info";

import GreenButton from "./Buttons/GreenButton";
import styles from "../../styles/uiComponents/debugAndroid";
import { dirDebugLogs } from "../../utility/dirStorage";
import ViewWithHeader from "./Screens/ViewWithHeader";
import i18n from "../../i18n";

const DebugEmailScreen = ( ): React.Node => {
  const appVersion = getVersion( );
  const buildVersion = getBuildNumber( );
  const device = getSystemName( );

  const emailParams = {
    subject: `Seek ${device} Logs (version ${appVersion} - ${buildVersion})`,
    helpEmail: "help+seek@inaturalist.org"
  };

  const setAttachment = ( ) => {
    if ( Platform.OS === "android" ) {
      return {
        path: dirDebugLogs, // The absolute path of the file from which to read data.
        type: "log" // Mime Type: jpg, png, doc, ppt, html, pdf, csv
      };
    } else {
      return {
        path: `${dirDebugLogs}/log.txt`, // The absolute path of the file from which to read data.
        mimeType: "txt" // Mime Type: jpg, png, doc, ppt, html, pdf, csv
      };
    }
  };

  const sendEmailAttachment = ( ) => {
    Mailer.mail( {
      subject: emailParams.subject,
      recipients: [emailParams.helpEmail],
      bccRecipients: [],
      isHTML: true,
      attachments: [setAttachment( )]
    }, ( error, event ) => {
      Alert.alert(
        error,
        event,
        [
          { text: "Ok", onPress: () => console.log( "OK: Email Error Response" ) },
          { text: "Cancel", onPress: () => console.log( "CANCEL: Email Error Response" ) }
        ],
        { cancelable: true }
      );
    } );
  };

  return (
    <ViewWithHeader header="inat_signup.email">
      <View style={styles.background}>
        <View style={styles.center}>
          <GreenButton
            handlePress={sendEmailAttachment}
            text="debug.logs"
          />
        </View>
      </View>
    </ViewWithHeader>
  );
};

export default DebugEmailScreen;
