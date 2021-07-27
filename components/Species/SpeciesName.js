// @flow

import React, { useContext, useState } from "react";
import { Text, Pressable, View } from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/species/species";
import ToastAnimation from "../UIComponents/ToastAnimation";
import { colors } from "../../styles/global";
import { UserContext } from "../UserContext";
import { useCommonName } from "../../utility/customHooks";
import Clipboard from "@react-native-community/clipboard";

type Props = {
  taxon: Object,
  id: number,
  selectedText: boolean,
  highlightSelectedText: ( ) => void
}

const SpeciesName = ( { taxon, id, selectedText, highlightSelectedText }: Props ): Node => {
  const { login } = useContext( UserContext );
  const commonName = useCommonName( id );
  const [copied, setCopied] = useState( false );

  const disabled = !login;

  const { scientificName } = taxon;

  const copyToClipboard = ( ) => {
    Clipboard.setString( scientificName );
    setCopied( true );
    highlightSelectedText( );
  };

  const finishAnimation = ( ) => setCopied( false );

  return (
    <>
      <Text style={textStyles.commonNameText}>{commonName || scientificName}</Text>
      <Pressable
        onPress={copyToClipboard}
        disabled={disabled}
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
            <Text
              style={[
                textStyles.scientificNameText,
                selectedText && viewStyles.selectedPressableArea
              ]}
            >
              {scientificName}
            </Text>
          </View>
        )}
      </Pressable>
    </>
  );
};

export default SpeciesName;
