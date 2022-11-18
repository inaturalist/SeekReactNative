// @flow
import * as React from "react";
import { View, Image } from "react-native";

import { viewStyles, textStyles } from "../../../styles/species/species";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { AppOrientationContext } from "../../UserContext";
import StyledText from "../../UIComponents/StyledText";

type Props = {
  +seenDate: ?string
}

const SeenDate = ( { loading, seenDate }: Props ): React.Node => {
  const { isLandscape } = React.useContext( AppOrientationContext );
  return !loading ? (
    <View style={[viewStyles.row, viewStyles.textContainer, isLandscape && viewStyles.largerTextContainer]}>
      <Image source={icons.checklist} style={viewStyles.checkmark} />
      <StyledText style={textStyles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</StyledText>
    </View>
  ) : null;
};

export default SeenDate;
