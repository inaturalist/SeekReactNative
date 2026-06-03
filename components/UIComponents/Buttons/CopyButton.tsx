import Clipboard from "@react-native-clipboard/clipboard";
import type { PropsWithChildren} from "react";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import viewStyles from "../../../styles/uiComponents/buttons/copyButton";
import ToastAnimation from "../../UIComponents/ToastAnimation";

interface Props extends PropsWithChildren {
  stringToCopy: string;
  handleHighlight: ( ) => void;
}

const CopyButton = ( { stringToCopy, children, handleHighlight }: Props ) => {
  const [copied, setCopied] = useState( false );

  const copyToClipboard = ( ) => {
    Clipboard.setString( stringToCopy );
    setCopied( true );
    handleHighlight( );
  };

  const finishAnimation = ( ) => setCopied( false );

  return (
    <Pressable
      onPress={copyToClipboard}
      style={viewStyles.pressableArea}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {( { pressed } ) => (
        <View>
          {copied && (
            <ToastAnimation
              visible={copied}
              styles={viewStyles.copiedAnimation}
              toastText={i18n.t( "species_detail.copied" )}
              finishAnimation={finishAnimation}
              rectangleColor={colors.seekGreen}
            />
          )}
          {children}
        </View>
      )}
    </Pressable>
  );
};

export default CopyButton;
