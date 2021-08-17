// @flow

import React, { useState } from "react";
import { Pressable, View } from "react-native";
import type { Node } from "react";
import Clipboard from "@react-native-community/clipboard";

import i18n from "../../../i18n";
import viewStyles from "../../../styles/uiComponents/buttons/copyButton";
import ToastAnimation from "../../UIComponents/ToastAnimation";
import { colors } from "../../../styles/global";

type Props = {
  stringToCopy: string,
  children: any,
  handleHighlight: ( ) => void
}

const CopyButton = ( { stringToCopy, children, handleHighlight }: Props ): Node => {
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
      // disabled={disabled}
      style={viewStyles.pressableArea}
    >
      {( { pressed } ) => (
        <View>
          {copied && (
            <ToastAnimation
              startAnimation={copied}
              styles={viewStyles.copiedAnimation}
              toastText={i18n.t( "species_detail.copied" )}
              finishAnimation={finishAnimation}
              rectangleColor={colors.seekTeal}
            />
          )}
          {children}
        </View>
      )}
    </Pressable>
  );
};

export default CopyButton;
