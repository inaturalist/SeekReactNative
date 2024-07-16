import React from "react";

import { viewStyles, textStyles } from "../../styles/species/species";
import { useCommonName } from "../../utility/customHooks/useCommonName";
import CopyButton from "../UIComponents/Buttons/CopyButton";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly loading: boolean;
  readonly taxon: {
    scientificName: string;
  };
  readonly id: number;
  readonly selectedText: boolean;
  readonly highlightSelectedText: ( ) => void;
}

const SpeciesName = ( { loading, taxon, id, selectedText, highlightSelectedText }: Props ) => {
  const commonName = useCommonName( id );
  const scientificName = taxon && taxon.scientificName;

  return (
    <>
      <StyledText style={[baseTextStyles.species, textStyles.commonNameText]}>{!loading ? ( commonName || scientificName ) : null}</StyledText>
      <CopyButton stringToCopy={scientificName} handleHighlight={highlightSelectedText}>
        <StyledText
          style={[
            baseTextStyles.speciesSmall,
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
