// @flow

import React from "react";
import { Text } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks";
import CopyButton from "../UIComponents/Buttons/CopyButton";

type Props = {
  taxon: Object,
  id: number,
  selectedText: boolean,
  highlightSelectedText: ( ) => void
}

const SpeciesName = ( { taxon, id, selectedText, highlightSelectedText }: Props ): Node => {
  const commonName = useCommonName( id );
  const scientificName = taxon && taxon.scientificName;

  return (
    <>
      <Text style={textStyles.commonNameText}>{commonName || scientificName}</Text>
      <CopyButton stringToCopy={scientificName} handleHighlight={highlightSelectedText}>
        <Text
          style={[
            textStyles.scientificNameText,
            selectedText && viewStyles.selectedPressableArea
          ]}
        >
          {scientificName}
        </Text>
      </CopyButton>
    </>
  );
};

export default SpeciesName;
