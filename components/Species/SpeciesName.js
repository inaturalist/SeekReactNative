// @flow

import React from "react";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks";
import CopyButton from "../UIComponents/Buttons/CopyButton";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

type Props = {
  taxon: Object,
  id: number,
  selectedText: boolean,
  highlightSelectedText: ( ) => void
}

const SpeciesName = ( { loading, taxon, id, selectedText, highlightSelectedText }: Props ): Node => {
  const commonName = useCommonName( id );
  const scientificName = taxon && taxon.scientificName;

  return (
    <>
      <StyledText style={[baseTextStyles.species, textStyles.commonNameText]}>{!loading ? ( commonName || scientificName ) : null}</StyledText>
      <CopyButton stringToCopy={scientificName} handleHighlight={highlightSelectedText}>
        <StyledText
          style={[
            textStyles.scientificNameText,
            selectedText && viewStyles.selectedPressableArea
          ]}
        >
          {!loading ? scientificName : null}
        </StyledText>
      </CopyButton>
    </>
  );
};

export default SpeciesName;
