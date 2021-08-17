// @flow

import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/species/species";
import GreenText from "./GreenText";
import { AppOrientationContext } from "../UserContext";


type Props = {
  +children: any,
  +text: string,
  +hide?: boolean
};

const SpeciesDetailCard = ( { children, text, hide }: Props ): React.Node => {
  const { isLandscape } = React.useContext( AppOrientationContext );

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
