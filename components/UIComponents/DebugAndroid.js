import React from "react";
import { View, Alert } from "react-native";
import Mailer from "react-native-mail";
import RNFS from "react-native-fs";

import GreenButton from "./GreenButton";
import styles from "../../styles/uiComponents/debugAndroid";

const DebugAndroid = () => {
  const helpEmail = "help+seek@inaturalist.org";

  const emailParams = {
    subject: "Android: Debug Logs for AR Camera",
    body: "",
    bcc: "amanda@inaturalist.org"
  };

  const sendEmailAttachment = () => {
    const dirAndroid = `${RNFS.ExternalStorageDirectoryPath}`;
    const fakeUrl = `${dirAndroid}/Pictures/a0854a25-b02c-42c0-b2fd-8121a9fd38d1.jpg`;

    console.log( fakeUrl, "fake url" );

    Mailer.mail( {
      subject: emailParams.subject,
      recipients: [emailParams.bcc],
      bccRecipients: [],
      body: "<b>Debug logs</b>",
      isHTML: true,
      attachment: {
        path: fakeUrl, // The absolute path of the file from which to read data.
        type: "jpg", // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: "Test Url" // Optional: Custom filename for attachment
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
    <View style={[styles.background, styles.center]}>
      <GreenButton
        handlePress={() => sendEmailAttachment()}
        text="debug.logs"
      />
    </View>
  );
};

export default DebugAndroid;
