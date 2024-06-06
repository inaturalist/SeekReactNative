import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity
} from "react-native";
import Mailer from "react-native-mail";
import Clipboard from "@react-native-clipboard/clipboard";

import { viewStyles, textStyles } from "../../styles/about";
import i18n from "../../i18n";
import StyledText from "../UIComponents/StyledText";
import ToastAnimation from "../UIComponents/ToastAnimation";
import { colors } from "../../styles/global";
import { UserContext } from "../UserContext";
import { baseTextStyles } from "../../styles/textStyles";

const EmailText = () => {
  const { login } = useContext( UserContext );
  const [copied, setCopied] = useState( false );

  if ( !login ) {
    return (
      <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "about.help" )}</StyledText>
    );
  }

  const finishAnimation = () => setCopied( false );

  const helpEmail = "help+seek@inaturalist.org";

  const emailParams = {
    subject: "Help with Seek",
    helpEmail
  };

  const sendEmail = () => {
    Mailer.mail(
      {
        subject: emailParams.subject,
        recipients: [emailParams.helpEmail],
        bccRecipients: [],
        isHTML: true
      },
      ( error, event ) => {
        Clipboard.setString( helpEmail );
        setCopied( true );
        console.log( "error", error );
        console.log( "event", event );
      }
    );
  };

  const handlePress = () => {
    sendEmail();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        {copied && (
          <ToastAnimation
            startAnimation={copied}
            styles={viewStyles.copiedAnimation}
            toastText={i18n.t( "species_detail.copied" )}
            finishAnimation={finishAnimation}
            rectangleColor={colors.seekGreen}
          />
        )}
        <StyledText style={[baseTextStyles.body, textStyles.text]}>{i18n.t( "about.help" )}</StyledText>
      </View>
    </TouchableOpacity>
  );
};


export default EmailText;
