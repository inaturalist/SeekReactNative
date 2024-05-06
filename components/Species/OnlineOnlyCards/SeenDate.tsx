import * as React from "react";
import { View, Image } from "react-native";

import { viewStyles } from "../../../styles/species/species";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import StyledText from "../../UIComponents/StyledText";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  loading: boolean;
  seenDate: string;
}

const SeenDate = ( { loading, seenDate }: Props ) => {
  const { isLandscape } = useAppOrientation( );
  return !loading ? (
    <View style={[viewStyles.row, viewStyles.textContainer, isLandscape && viewStyles.largerTextContainer]}>
      <Image source={icons.checklist} style={viewStyles.checkmark} />
      <StyledText style={baseTextStyles.body}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</StyledText>
    </View>
  ) : null;
};

export default SeenDate;
