import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/species/species";
import GreenText from "./GreenText";
import { useAppOrientation } from "../Providers/AppOrientationProvider";


interface Props extends React.PropsWithChildren {
  readonly text: string;
  readonly hide?: boolean;
}

const SpeciesDetailCard = ( { children, text, hide = false }: Props ) => {
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

export default SpeciesDetailCard;
