import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/species/species";
import GreenText from "./GreenText";
import { useAppOrientation } from "../Providers/AppOrientationProvider";


interface Props {
  readonly children: React.ReactNode;
  readonly text: string;
  readonly hide?: boolean;
}

const SpeciesDetailCard = ( { children, text, hide }: Props ) => {
  const { isLandscape } = useAppOrientation( );

  if ( hide ) {
    return null;
  }
  return (
    <View style={isLandscape ? viewStyles.largerTextContainer : viewStyles.textContainer}>
      <View style={viewStyles.headerMargins}>
        <GreenText text={text} />
      </View>
      {children}
    </View>
  );
};

SpeciesDetailCard.defaultProps = {
  hide: false
};

export default SpeciesDetailCard;
