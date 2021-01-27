// @flow

import React from "react";
import { View, Alert } from "react-native";
import Mailer from "react-native-mail";
import { getVersion, getBuildNumber } from "react-native-device-info";

import GreenButton from "./Buttons/GreenButton";
import styles from "../../styles/uiComponents/debugAndroid";
import { dirDebugLogs } from "../../utility/dirStorage";

const DebugAndroid = () => {
  const appVersion = getVersion();
  const buildVersion = getBuildNumber();

  const emailParams = {
    subject: `Seek Android Logs (version ${appVersion} - ${buildVersion})`,
    helpEmail: "help+seek@inaturalist.org"
  };

  const sendEmailAttachment = () => {
    Mailer.mail( {
      subject: emailParams.subject,
      recipients: [emailParams.helpEmail],
      bccRecipients: [],
      isHTML: true,
      attachment: {
        path: dirDebugLogs, // The absolute path of the file from which to read data.
        type: "log" // Mime Type: jpg, png, doc, ppt, html, pdf, csv
      }
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
    <View style={styles.background}>
      <View style={styles.center}>
        <GreenButton
          handlePress={() => sendEmailAttachment()}
          text="debug.logs"
        />
      </View>
    </View>
  );
};

export default DebugAndroid;
