// @flow
import * as React from "react";
import { View, Image, Text } from "react-native";

import { viewStyles, textStyles } from "../../../styles/species/species";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { AppOrientationContext } from "../../UserContext";

type Props = {
  +seenDate: ?string
}

const SeenDate = ( { seenDate }: Props ): React.Node => {
  const { isLandscape } = React.useContext( AppOrientationContext );
    return (
    <View style={[viewStyles.row, viewStyles.textContainer, isLandscape && viewStyles.largerTextContainer]}>
      <Image source={icons.checklist} style={viewStyles.checkmark} />
      <Text style={textStyles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
    </View>
  );
};

export default SeenDate;
