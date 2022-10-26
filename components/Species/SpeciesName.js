// @flow

import React from "react";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks";
import CopyButton from "../UIComponents/Buttons/CopyButton";
import StyledText from "../UIComponents/StyledText";

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
      <StyledText style={textStyles.commonNameText}>{commonName || scientificName}</StyledText>
      <CopyButton stringToCopy={scientificName} handleHighlight={highlightSelectedText}>
        <StyledText
          style={[
            textStyles.scientificNameText,
            selectedText && viewStyles.selectedPressableArea
          ]}
        >
          {scientificName}
        </StyledText>
      </CopyButton>
    </>
  );
};

export default SpeciesName;
